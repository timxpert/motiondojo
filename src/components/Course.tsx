import React from 'react';
import { COMMUNITY_JOIN_URL, COURSE_URL, NINJAS_SHOWCASE_URL } from '@/config/site';

/* Motion Dojo, Black Belt and Keyframe Ninjas: what each name means. */
export function Course() {
  const parts = [
    {
      name: 'Motion Dojo',
      is: 'The community',
      body: 'Smartphone motion designers and creative enthusiasts learning, connecting and growing together.',
      link: { href: COMMUNITY_JOIN_URL, label: 'Join the community', newTab: true, className: 'btn btn-primary' },
    },
    {
      name: 'Black Belt in Motion Design',
      is: 'The course',
      body: 'Structured training for members who want a guided learning experience.',
      link: { href: COURSE_URL, label: 'See the course', newTab: true, className: 'btn btn-lime' },
    },
    {
      name: 'Keyframe Ninjas',
      is: 'Students on the course',
      body: 'Members enrolled in Black Belt in Motion Design.',
      link: { href: NINJAS_SHOWCASE_URL, label: 'See their work', newTab: true, className: 'btn btn-light' },
    },
  ];

  return (
    <section className="section" id="ecosystem" aria-labelledby="ecosystem-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="ecosystem-title">
            The community, the course and the Ninjas.
          </h2>
        </div>
        <ul className="eco">
          {parts.map((p) => (
            <li key={p.name} className="eco-row">
              <div className="eco-name">
                <span className="eco-is">{p.is}</span>
                <h3>{p.name}</h3>
              </div>
              <p>{p.body}</p>
              {p.link.href && (
                <a
                  href={p.link.href}
                  className={`${p.link.className} btn-sm`}
                  {...(p.link.newTab ? { target: '_blank', rel: /^https?:/.test(p.link.href) ? 'noopener noreferrer' : 'noopener' } : {})}
                >
                  {p.link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
