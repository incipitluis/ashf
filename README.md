# ASHF Management Portal

A Next.js 14 application designed to streamline the management of academic indexed journals, specifically for "Anales del Seminario de Historia de la Filosofía" (ASHF). Because researching medieval theologians and embracing modern technology aren't mutually exclusive endeavors.

## Overview

This project serves as a Proof of Concept (POC) for various tools and functionalities that could make academic journal management less painful (we're trying, we really are). Built with modern web technologies, it aims to automate and simplify common administrative tasks.

## Features

- **Certificate Generation**: Automated generation of acceptance certificates for published articles
- **Database Management**: Easy access and management of published articles
- **Administrative Tools**: Streamlined interfaces for common editorial tasks
- More features coming soon

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- A sense of humor (optional but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ashf-management.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
ashf/
├── app/
│   ├── admin/           # Administrative interface
│   ├── certificates/    # Certificate generation
├── components/         # Shared components
├── lib/               # Utility functions
└── public/            # Static assets
```

## Contributing

We welcome contributions from anyone who thinks they can make academic journal management less of a headache. Please read our contributing guidelines before submitting pull requests.

## Development Roadmap

- [x] Basic certificate generation
- [ ] Reviewer management system
- [ ] Automated mailing for frequent questions
- [ ] Advanced analytics
- [ ] Time machine to automate peer reviews (pending physics breakthrough)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The entire ASHF editorial team for their enthusiasm and support with our technological experiments
- Ediciones Complutense, with hope that they will give us access to OJS API soon

## Contact

For questions, suggestions, or debates about the nature of digital automation, please open an issue or contact the maintainers.

---

Built with ❤️ and 🤔 by the ASHF Tech Team
