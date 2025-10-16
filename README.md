# CTF Challenge: Secret Admin Panel

## Challenge Description

You've discovered a secure admin portal for a company. Your mission: Find the hidden flag!

**Difficulty:** Medium
**Time Estimate:** 15 minutes
**Tech Stack:** Next.js, React

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Navigate to `http://localhost:3000`

### JWT Parser `https://www.jwt.io/`

## Your Mission

Find the flag! It's hidden somewhere only admins should be able to access...

**Flag Format:** `CTF{...}`

## Hints (reveal if stuck after 10 minutes)

<details>
<summary>Hint 1</summary>
Take a look at how the authentication works. What information is stored in your token?
</details>

<details>
<summary>Hint 2</summary>
Browser DevTools are your friend. Check the Application/Storage tab.
</details>

<details>
<summary>Hint 3</summary>
JWTs are just base64-encoded JSON. What happens if you modify the payload?

`localStorage.setItem('yourTokenKey', 'yourTokenValue');`

</details>

---
