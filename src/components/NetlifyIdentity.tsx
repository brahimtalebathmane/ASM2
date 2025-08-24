import React, { useEffect } from 'react';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const NetlifyIdentity: React.FC = () => {
  useEffect(() => {
    // Load Netlify Identity widget
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user: any) => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/';
            });
          }
        });

        // Handle password setup for invited users
        window.netlifyIdentity.on('invite', () => {
          window.netlifyIdentity.open('signup');
        });

        // Auto-open signup for invited users
        const params = new URLSearchParams(window.location.search);
        if (params.get('invite_token')) {
          window.netlifyIdentity.open('signup');
        }
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default NetlifyIdentity;