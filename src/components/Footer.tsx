import React from 'react';
import { INSTAGRAM_URL, LEARN_MORE_URL, NINJAS_DIRECTORY_URL, YOUTUBE_URL } from '@/config/site';
import { InstagramIcon, YoutubeIcon } from './Icons';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a href="#top" className="brand" aria-label="Motion Dojo, back to top">
              <img src="/assets/favicon-128.png" alt="" width={34} height={34} />
              Motion Dojo
            </a>
            <p className="footer-tag">Train like a ninja, create like a master.</p>
            <div className="socials">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Motion Dojo on Instagram">
                <InstagramIcon />
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="Motion Dojo on YouTube">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h3>Motion Dojo</h3>
              <ul>
                <li>
                  <a href={LEARN_MORE_URL}>Black Belt course</a>
                </li>
                <li>
                  <a href={NINJAS_DIRECTORY_URL} target="_blank" rel="noopener noreferrer">
                    Keyframe Ninjas
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>On this page</h3>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#path">Ninja Path</a>
                </li>
                <li>
                  <a href="#stories">Stories</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Motion Dojo. All rights reserved.</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
