# MSA - Association Mauritanienne des Startups

This website includes a Netlify CMS admin dashboard for easy content management.
## Content Management System (CMS)
### Admin Access
- Admin dashboard: `/admin`
- Requires Netlify Identity authentication
- Admins can edit all content, images, and site configuration
### Features
- Edit site configuration (logo, title, contact info)
- Manage hero section content
- Update about section and missions
- Add/edit startups, events, news articles
- Manage partners and resources
- Configure membership plans
### Setup Instructions
1. Enable Netlify Identity in your Netlify dashboard
2. Enable Git Gateway in Identity settings
3. Invite admin users through Netlify Identity
4. Invited users can set their password directly through the invitation link
### Auto-Publishing
All changes made through the CMS are automatically committed to the repository and deployed to the live site.