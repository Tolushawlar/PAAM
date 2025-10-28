# PAAM App - Client Data Requirements

## Overview
This document outlines the essential information needed from clients to customize the PAAM application with their own organizational data.

## Organization Information
- **Organization Name**: Full legal name of the organization
- **Logo**: High-resolution logo files (SVG preferred, PNG acceptable)
- **Mission Statement**: Brief description of organization's mission
- **Contact Information**:
  - Physical address
  - Phone number
  - Email address
  - Website URL

**Example:**
```
Organization Name: Christ Faith Network International
Mission: Empowering believers through digital discipleship and community building
Address: 123 Faith Street, Lagos, Nigeria
Phone: +234-800-123-4567
Email: info@cfn.org
Website: www.cfn.org
```

## Training Programs
**Required for each program:**
- Program title
- Program description
- Program status (Active/Inactive)

**Example:**
```
Title: Leadership Training
Description: Leadership training to become CFN Leader
Status: Active

Title: Member Orientation Training
Description: Comprehensive orientation program for new members
Status: Active

Title: Mandate Training
Description: Essential mandate training for all members
Status: Active
```

## Training Modules
**Required for each module:**
- Module title
- Module description
- Associated program
- Module sequence/order
- Video URL (optional)

**Example:**
```
Title: Leadership Fundamentals
Description: Core principles of effective leadership
Program: Leadership Training
Order: 1
Video: https://youtube.com/watch?v=example123

Title: Team Management
Description: Managing and leading teams effectively
Program: Leadership Training
Order: 2
Video: https://youtube.com/watch?v=example456
```

## Training Courses
**Required for each course:**
- Course title
- Course description
- Course content (text/HTML format)
- Associated module

**Example:**
```
Title: Leadership Styles
Description: Different leadership approaches and when to use them
Module: Leadership Fundamentals
Content: <p>Leadership styles vary based on situation and team needs...</p>

Title: Decision Making
Description: Effective decision-making processes
Module: Leadership Fundamentals
Content: <p>Good leaders make informed decisions by...</p>
```

## Users - Administrators
**Required for each admin:**
- First name
- Last name
- Email address
- Phone number
- Password
- Country
- State
- Address
- Occupation

**Example:**
```
First Name: John
Last Name: Doe
Email: admin@cfn.org
Phone: +234-800-111-2222
Password: SecurePass123!
Country: Nigeria
State: Lagos
Address: 456 Admin Street, Lagos
Occupation: System Administrator
```

## Users - Coordinators
**Required for each coordinator:**
- First name
- Last name
- Email address
- Phone number
- Password
- Country
- State
- City
- Address
- Occupation
- Role title
- Location title
- Assigned CFN groups

**Example:**
```
First Name: Mary
Last Name: Johnson
Email: coordinator1@cfn.org
Phone: +234-800-333-4444
Password: CoordPass456!
Country: Nigeria
State: Ondo
City: Akure
Address: 789 Coordinator Ave, Akure
Occupation: Ministry Coordinator
Role Title: Regional Coordinator
Location Title: Akure Region
Assigned Groups: ["Akure Central Group", "Akure North Group"]
```

## Users - Members
**Required for each member:**
- First name
- Last name
- Email address
- Phone number
- Password
- Country
- State
- City
- Address
- Occupation
- CFN group assignment

**Example:**
```
First Name: David
Last Name: Smith
Email: member1@email.com
Phone: +234-800-555-6666
Password: MemberPass789!
Country: Nigeria
State: Ondo
City: Akure
Address: 321 Member Road, Akure
Occupation: Teacher
CFN Group: Akure Central Group
```

## CFN Groups/Locations
**Required for each group:**
- Group name
- Country
- State/Province
- City
- Physical address
- Assigned coordinator ID
- Latitude/Longitude (optional)

**Example:**
```
Group Name: Akure Central Group
Country: Nigeria
State: Ondo
City: Akure
Address: 24, State Industrial Layout, Akure
Coordinator: Mary Johnson (coordinator1@cfn.org)
Latitude: 7.2571
Longitude: 5.2058

Group Name: Lagos Mainland Group
Country: Nigeria
State: Lagos
City: Lagos
Address: 15, Victoria Island, Lagos
Coordinator: Peter Williams (coordinator2@cfn.org)
```

## CFN Meetings
**Required for each meeting:**
- CFN group
- Meeting title
- Meeting date and time
- Location details
- Expected attendees

**Example:**
```
Group: Akure Central Group
Title: Mid-week Fellowship
Date/Time: 2025-06-23 14:04:11
Location: No 12, Asokoro Layout, Jabi Estate
Attendees: ["David Smith", "Sarah Jones", "Michael Brown"]

Group: Lagos Mainland Group
Title: Sunday Evening Fellowship
Date/Time: 2025-09-23 14:04:11
Location: 15, Victoria Island Conference Room
```

## Assessment Questions
**Required for each quiz:**
- Question text
- Option A, B, C, D
- Correct answer
- Associated course

**Example:**
```
Question: What is the most important quality of a good leader?
Option A: Authority
Option B: Servant heart
Option C: Intelligence
Option D: Charisma
Correct Answer: B
Course: Leadership Styles

Question: Which decision-making model involves team input?
Option A: Autocratic
Option B: Democratic
Option C: Laissez-faire
Option D: Bureaucratic
Correct Answer: B
Course: Decision Making
```

## Branding & Theme
- **Primary color** (hex code)
- **Secondary color** (hex code)
- **Background images** (if any)
- **Custom icons** (if any)

**Example:**
```
Primary Color: #b8144a
Secondary Color: #2c3e50
Background Images: hero-bg.jpg, login-bg.jpg
Custom Icons: cfn-logo.svg, ministry-icon.svg
```

## Optional Features

### Donation Campaigns
- Campaign titles
- Campaign descriptions
- Goal amounts

**Example:**
```
Title: Building Fund 2025
Description: Raising funds for new ministry center construction
Goal Amount: $50,000

Title: Mission Outreach
Description: Supporting missionary work in rural communities
Goal Amount: $25,000
```

### Live Streaming
- Stream titles
- Stream URLs
- Scheduled times

**Example:**
```
Title: Sunday Service Live
URL: https://youtube.com/live/sunday-service
Schedule: Every Sunday 10:00 AM WAT

Title: Wednesday Bible Study
URL: https://youtube.com/live/bible-study
Schedule: Every Wednesday 7:00 PM WAT
```

## Technical Configuration
- **Database connection details**
- **API authentication preferences**
- **Server hosting information**

## Data Format
All data should be provided in:
- Excel/CSV format for structured data
- Image files for logos/graphics
- Text documents for content

## Next Steps
1. Client provides data using this checklist
2. Development team imports data into system
3. Branding customization applied
4. Testing and validation
5. Deployment to client environment