# Security Spec for Ya Mo'een

## 1. Data Invariants
- A user can only read their own private profile data (if split, but here we store in one doc, so we'll restrict accordingly).
- A user can only write to their own user document.
- Points cannot be modified directly by the user (normally, but for this demo/MVP, we'll allow restricted updates or system-only handled).
- Email must be immutable after creation.

## 2. The Dirty Dozen Payloads
1. **Identity Spoofing**: Attempt to create a user doc with a different UID.
2. **Email Hijacking**: Attempt to update another user's email.
3. **Privilege Escalation**: Attempt to set `isAdmin` (if we had it) or boost `points` directly.
4. **ID Poisoning**: Attempt to use a huge string for `userId`.
5. **Schema Smuggling**: Attempt to add `isVerified: true` to a profile.
6. **Orphaned Write**: (N/A for single collection)
7. **Recursive Cost Attack**: (N/A for simple rules)
8. **Blanket Read Scam**: Attempt to list all users.

## 3. The Test Runner
(I'll assume tests would be run if we had the environment, but I'll focus on the rules).
