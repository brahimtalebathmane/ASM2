# MSA - Association Mauritanienne des Startups

## Dynamic Content Management

All content is now dynamically loaded from the `public/data/` folder:
- Site configuration: `/public/data/siteConfig.json`
- Hero content: `/public/data/heroContent.json`
- About content: `/public/data/aboutContent.json`
- Membership plans: `/public/data/membership.json`
- Collections (startups, events, news, partners, resources): `/public/data/[collection]/`

This website includes a Netlify CMS admin dashboard for easy content management.
## Content Management System (CMS)
### Admin Access
- Admin dashboard: `/admin`
- Requires Netlify Identity authentication
- Admins can edit all content, images, and site configuration
### Features
- **Full CRUD Operations**: Create, Read, Update, Delete for all collections
- **Dynamic Content**: All changes appear immediately on the live site
- **Image Management**: Upload and manage images through the CMS
- **Real-time Updates**: No manual rebuilds required
- **Empty by Default**: All collections start empty and can be populated via CMS
- **Collections Management**:
  - ✅ Startups: Add/edit/delete startup profiles
  - ✅ Events: Manage upcoming and past events
  - ✅ News & Articles: Create/edit/delete blog posts
  - ✅ Partners: Add/remove partner organizations
  - ✅ Resources: Manage downloadable resources
### Setup Instructions
1. Enable Netlify Identity in your Netlify dashboard
2. Enable Git Gateway in Identity settings
3. Invite admin users through Netlify Identity
4. Invited users can set their password directly through the invitation link
5. Start adding content through the CMS at `/admin`
### Auto-Publishing
All changes made through the CMS are automatically committed to the repository and deployed to the live site.