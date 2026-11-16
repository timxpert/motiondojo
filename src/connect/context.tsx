'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ConnectApi, Profile } from './types';

type Ctx = {
  api: ConnectApi;
  /** undefined while loading, null when signed out or no profile yet */
  me: Profile | null | undefined;
  signedIn: boolean;
  refreshMe: () => Promise<void>;
  toast: (msg: string) => void;
  /** In-page dialog. With `input`, resolves to the typed text; without, to 'ok'. Null when cancelled. */
  ask: (o: { title: string; body?: string; input?: string; confirm: string; danger?: boolean }) => Promise<string | null>;
};

type Ask = { title: string; body?: string; input?: string; confirm: string; danger?: boolean; resolve: (v: string | null) => void };

const ConnectCtx = createContext<Ctx | null>(null);

export function ConnectProvider({ api, children }: { api: ConnectApi; children: React.ReactNode }) {
  const [me, setMe] = useState<Profile | null | undefined>(undefined);
  const [signedIn, setSignedIn] = useState(false);
  const [note, setNote] = useState('');
  const [dialog, setDialog] = useState<Ask | null>(null);
  const [text, setText] = useState('');

  const refreshMe = useCallback(async () => {
    const s = await api.session();
    const m = s ? await api.me() : null;
    // set together so screens never see "signed in" with a stale profile
    setSignedIn(Boolean(s));
    setMe(m);
  }, [api]);

  useEffect(() => {
    refreshMe();
    return api.onAuthChange(() => {
      refreshMe();
    });
  }, [api, refreshMe]);

  const toast = useCallback((msg: string) => {
    setNote(msg);
    window.setTimeout(() => setNote((n) => (n === msg ? '' : n)), 3200);
  }, []);

  const ask = useCallback<Ctx['ask']>(
    (o) =>
      new Promise((resolve) => {
        setText('');
        setDialog({ ...o, resolve });
      }),
    [],
  );
  const close = (v: string | null) => {
    dialog?.resolve(v);
    setDialog(null);
  };

  const value = useMemo(() => ({ api, me, signedIn, refreshMe, toast, ask }), [api, me, signedIn, refreshMe, toast, ask]);
  return (
    <ConnectCtx.Provider value={value}>
      {children}
      {dialog && (
        <div className="cx-dialog-wrap" onClick={(e) => e.target === e.currentTarget && close(null)} onKeyDown={(e) => e.key === 'Escape' && close(null)}>
          <form
            className="cx-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cx-dialog-title"
            onSubmit={(e) => {
              e.preventDefault();
              close(dialog.input !== undefined ? text.trim() : 'ok');
            }}
          >
            <h2 id="cx-dialog-title">{dialog.title}</h2>
            {dialog.body && <p>{dialog.body}</p>}
            {dialog.input !== undefined && (
              <textarea autoFocus rows={3} maxLength={500} placeholder={dialog.input} value={text} onChange={(e) => setText(e.target.value)} />
            )}
            <div className="cx-dialog-btns">
              <button type="button" className="btn btn-light btn-sm" onClick={() => close(null)} autoFocus={dialog.input === undefined}>
                Cancel
              </button>
              <button type="submit" className={dialog.danger ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm'}>
                {dialog.confirm}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className={note ? 'cx-toast is-on' : 'cx-toast'} role="status" aria-live="polite">
        {note}
      </div>
    </ConnectCtx.Provider>
  );
}

export function useConnect() {
  const c = useContext(ConnectCtx);
  if (!c) throw new Error('useConnect outside ConnectProvider');
  return c;
}
