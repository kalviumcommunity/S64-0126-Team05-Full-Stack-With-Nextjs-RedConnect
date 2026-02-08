# 📹 Video Demo Script & Checklist

## Assessment Status

### ✅ Completed Tasks
1. **API Folder Structure** — Organized under `src/app/api/` with RESTful conventions
2. **RESTful Endpoints** — Implemented GET/POST for blood-banks, donors, and blood-donation
3. **Pagination & Filtering** — page, limit, bloodType, city filters
4. **Error Handling** — HTTP 400, 404, 409, 500 status codes with meaningful messages
5. **Testing** — All endpoints verified working with curl
6. **README Documentation** — Complete API docs with examples

### ⏳ Final Step: Video Demo (1-2 minutes)

---

## 📽️ Video Recording Checklist

### Part 1: Directory Structure (15 seconds)
**What to show:**
- [ ] Open VS Code Explorer
- [ ] Navigate to `src/app/api/`
- [ ] Show the folder structure:
  ```
  api/
  ├── blood-banks/route.ts
  ├── blood-donation/route.ts
  ├── donors/route.ts
  ├── messages/route.ts
  ├── notifications/route.ts
  ├── reports/route.ts
  ├── test/route.ts
  └── users/route.ts
  ```
- [ ] Briefly explain: "Each folder represents a resource, following REST conventions with plural nouns"

**Script:**
> "Here's our API folder structure under `src/app/api/`. Each resource has its own route file following REST naming conventions. We have blood-banks, donors, blood-donation, users, messages, notifications, and reports. This makes it easy to scale — adding a new resource just means adding a new folder with a route.ts file."

---

### Part 2: Working Endpoints Demo (45 seconds)

#### Endpoint 1: GET /api/blood-banks (Pagination Example)
**Terminal commands to show:**

```bash

npm run dev
curl -X GET "http://localhost:3000/api/blood-banks?page=1&limit=5"
```

**What should display:**
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 1,
    "totalPages": 1
  }
}
```

**Script:**
> "First, let's test the blood banks endpoint with pagination. We're requesting page 1 with a limit of 5 items per page. Notice the meta object shows pagination details: current page, items per page, total count, and total pages. This is essential for building scalable applications."

---

#### Endpoint 2: POST /api/donors (Create with Validation)
**Terminal commands:**

```bash
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo Donor",
    "email": "demo@example.com",
    "phone": "9999999999",
    "bloodType": "A+",
    "dateOfBirth": "2000-01-15",
    "address": "123 Demo Street",
    "city": "DemoCity"
  }'
```

**What should display:**
```json
{
  "data": {
    "id": "uuid-here",
    "name": "Demo Donor",
    "email": "demo@example.com",
    "bloodType": "A+",
    ...
  }
}
```

**Script:**
> "Now let's create a donor. We're sending a POST request with required fields: name, email, phone, blood type, date of birth, address, and city. The server validates each field and returns the created donor with a 201 status. If we were to omit a required field, we'd get a 400 Bad Request error with a specific message about which field is missing."

---

#### Endpoint 3: Error Handling (Show Validation)
**Terminal commands:**

```bash
# Show error response for duplicate email
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another Donor",
    "email": "demo@example.com",
    "phone": "8888888888",
    "bloodType": "B-",
    "dateOfBirth": "1995-06-20",
    "address": "456 Another St",
    "city": "AnotherCity"
  }'
```

**What should display:**
```json
{
  "error": {
    "message": "A donor with this email already exists"
  }
}
```

**Script:**
> "Let's test error handling. If we try to create a donor with an email that already exists, we get a 409 Conflict status with a meaningful error message. This prevents duplicate entries and provides clear feedback to the client."

---

### Part 3: Reflection on Structure & Naming (30 seconds)

**Script:**
> "Now let's discuss why this structure matters for scaling and teamwork.

> **First, consistency:** Every resource follows the same pattern — GET for fetching, POST for creating. New team members don't need extensive documentation; they can predict the endpoints.

> **Second, maintainability:** If we need to add a new resource like 'ambulances' or 'blood-camps', we just create a new folder `ambulances` with a `route.ts` file. The pattern is immediately obvious.

> **Third, preventing bugs:** Using plural nouns (`/api/donors` not `/api/donor`) prevents confusion. Status codes (201 for created, 400 for bad request) are consistent across all endpoints.

> **Finally, professionalism:** This follows industry REST standards. When clients need to integrate with our API, documentation is clear and expectations are set from the folder structure itself.

> For a growing team working on health-critical systems like blood donation networks, clear structure isn't just nice-to-have — it's essential for preventing errors that could literally cost lives."

---

## 🎬 Recording Tips

1. **Audio:** Speak clearly and slowly
2. **Screen:** Maximize text size (Cmd+Plus on Mac) so terminal text is readable
3. **Pacing:** Leave 1-2 seconds between terminal commands for clarity
4. **Copy/Paste:** Pre-copy commands so you don't type them during recording
5. **Timing:** Total length should be 1.5-2 minutes

---

## 📋 Pre-Recording Checklist

- [ ] Server running (`npm run dev`)
- [ ] Terminal has readable font size
- [ ] Create a fresh donor email for demo (use timestamp: `donor-{timestamp}@test.com`)
- [ ] Test all APIs once before recording
- [ ] Have README open in another window for reference
- [ ] Clear terminal history for cleaner look

---

## 🎥 Final Submission

After recording:
1. Save video as MP4 or WEBM
2. Upload to Google Drive
3. Set to "Anyone with the link can edit"
4. Create PR with:
   - Updated README (✅ Done)
   - Updated API route files (✅ Done)
   - Video link in PR description
5. Tag: `assessment/api-design`

---

## 📌 Quick Command Reference

```bash
# Start server
npm run dev

# Test blood-banks (pagination)
curl "http://localhost:3000/api/blood-banks?page=1&limit=5"

# Create donor
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"9999999999","bloodType":"A+","dateOfBirth":"2000-01-15","address":"123 St","city":"City"}'

# Test error (missing field)
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```

Good luck with your video! 🎬
