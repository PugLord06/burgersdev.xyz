import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_ats_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom ATS-friendly styles (Helvetica font, standard margins)
    name_style = ParagraphStyle(
        'ATS_Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0F172A'),
        alignment=0
    )

    title_style = ParagraphStyle(
        'ATS_Title',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#2563EB'),
        alignment=0
    )

    contact_style = ParagraphStyle(
        'ATS_Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#475569'),
        alignment=0
    )

    heading_style = ParagraphStyle(
        'ATS_Heading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=12,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'ATS_Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'ATS_Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        leftIndent=14,
        spaceAfter=2
    )

    bold_label_style = ParagraphStyle(
        'ATS_BoldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#0F172A')
    )

    story = []

    # Header Section
    story.append(Paragraph("MICHAEL BURGERS", name_style))
    story.append(Paragraph("Full-Stack Software Engineer &amp; AI Developer", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Cape Town, South Africa &nbsp;|&nbsp; michaelburgers06@gmail.com &nbsp;|&nbsp; github.com/PugLord06", contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=8))

    # Professional Summary Section
    story.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
    summary_text = (
      "Disciplined, performance-driven 20-year-old South African Software Engineer and 3rd-year BScIT student at Eduvos (Top 15% academic standing, "
      "Hollywoodbets &amp; Hollywood Foundation Bursary Recipient). Founder of independent game studio Is It Studios and published creator of isitcheatingif.com "
      "(500+ monthly active users). Experienced in full-stack React/Next.js/TypeScript architectures, enterprise Java (Spring Boot, JWT), Python AI integrations, "
      "and cloud infrastructure (GCP, Oracle Cloud OCI, Railway, Render). Contributor of formal policy feedback on the Draft South Africa National Artificial Intelligence Policy."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))

    # Technical Skills Section
    story.append(Paragraph("TECHNICAL SKILLS", heading_style))
    story.append(Paragraph("<b>Languages:</b> Java, TypeScript, JavaScript, Python, PHP, Kotlin, SQL (MySQL, SQLite), Shell/Bash, HTML5, CSS3/Sass, MATLAB, R", bullet_style))
    story.append(Paragraph("<b>Frontend &amp; Mobile:</b> React, Next.js, React Native (Cross-platform Mobile), Tailwind CSS, Vite, Webpack", bullet_style))
    story.append(Paragraph("<b>Backend &amp; Security:</b> Spring Boot, Spring Security (JWT), Node.js, Express, FastAPI, REST API Architecture, WebSockets", bullet_style))
    story.append(Paragraph("<b>Cloud &amp; Infrastructure:</b> Google Cloud (GCP - Expert), Oracle Cloud (OCI - VM Setup, Port Ingress, VCN Routing), Vercel, Railway, Render, Docker", bullet_style))
    story.append(Paragraph("<b>Databases &amp; Storage:</b> MySQL, SQLite, MongoDB (NoSQL), Firebase, Domain &amp; DNS Management (A, CNAME, TXT, SSL)", bullet_style))
    story.append(Paragraph("<b>Software Engineering &amp; Testing:</b> OOP, Design Patterns, SOLID Principles, Data Structures &amp; Algorithms, Git/GitHub, CI/CD, JUnit, Jest, Vitest, Postman", bullet_style))
    story.append(Spacer(1, 6))

    # Key Projects Section
    story.append(Paragraph("PROJECT EXPERIENCE &amp; VENTURES", heading_style))

    # Project 1: isitcheatingif.com & Is It Studios
    story.append(Paragraph("<b>isitcheatingif.com — Flagship Web Platform</b> &nbsp;&nbsp;|&nbsp;&nbsp; <i>Is It Studios &nbsp;|&nbsp; React, Next.js, TypeScript, TailwindCSS</i>", bold_label_style))
    story.append(Paragraph("• Founded independent studio Is It Studios and published viral procedural debate platform serving <b>500+ monthly active users</b>.", bullet_style))
    story.append(Paragraph("• Implemented interactive dilemma evaluation logic, real-time vote distribution analytics, and dynamic UI reveal animations.", bullet_style))
    story.append(Paragraph("• Executed advanced SEO strategies to drive organic traffic, maintaining a high 13% Click-Through Rate (CTR) since launch.", bullet_style))
    story.append(Paragraph("• Resolved Next.js SSR hydration state mismatches and optimized structural layout guidelines for Google AdSense approval.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 2: Riot Games Approved Discord Bot
    story.append(Paragraph("<b>Teamfight Tactics Discord Stats Tracker</b> &nbsp;&nbsp;|&nbsp;&nbsp; <i>Riot Games Approved API &nbsp;|&nbsp; Python, Discord API, REST</i>", bold_label_style))
    story.append(Paragraph("• Engineered a Riot Games-approved Discord statistics tracker for Teamfight Tactics (TFT) calculating live match statistics and leaderboard ranks.", bullet_style))
    story.append(Paragraph("• Configured secure API rate limiting, asynchronous match polling, and custom embeds for active Discord gaming communities.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 3: Java Spring Boot Web Suite
    story.append(Paragraph("<b>Java &amp; Spring Boot Web Suite — Enterprise Web Applications</b> &nbsp;&nbsp;|&nbsp;&nbsp; <i>Java, Spring Boot, Spring Security, JWT, SQL</i>", bold_label_style))
    story.append(Paragraph("• Architected full-stack enterprise Java web applications implementing Spring Boot REST APIs, Dependency Injection, and DTO layers.", bullet_style))
    story.append(Paragraph("• Configured stateless authentication using Spring Security and JSON Web Tokens (JWT) with role-based access control (RBAC).", bullet_style))
    story.append(Spacer(1, 4))

    # Project 4: LekkerFinds.co.za
    story.append(Paragraph("<b>lekkerfinds.co.za — E-Commerce Platform</b> &nbsp;&nbsp;|&nbsp;&nbsp; <i>Shopify &nbsp;|&nbsp; Liquid &nbsp;|&nbsp; Domain Setup</i>", bold_label_style))
    story.append(Paragraph("• Edited Shopify templates using Liquid language to match brand requirements and configured custom domain DNS setup.", bullet_style))
    story.append(Spacer(1, 6))

    # Project 5: burgersdev.xyz Portfolio
    story.append(Paragraph("<b>burgersdev.xyz — Interactive Developer Portfolio</b> &nbsp;&nbsp;|&nbsp;&nbsp; <i>React, Vite, Python, FastAPI, Gemini AI</i>", bold_label_style))
    story.append(Paragraph("• Engineered a high-performance, interactive developer portfolio showcasing full-stack capabilities and modern web design.", bullet_style))
    story.append(Paragraph("• Integrated a real-time AI Assistant chat powered by a custom Python FastAPI &amp; Google Gemini RAG backend using Server-Sent Events (SSE).", bullet_style))
    story.append(Spacer(1, 6))

    # Education & Credentials Section
    story.append(Paragraph("EDUCATION, HONOURS &amp; GOVERNANCE", heading_style))
    story.append(Paragraph("<b>Bachelor of Science in Information Technology (Software Engineering Specialization)</b> &nbsp;&nbsp;|&nbsp;&nbsp; <i>Eduvos Cape Town Campus</i> (2024 – 2026)", bold_label_style))
    story.append(Paragraph("• <b>Academic Distinction:</b> Maintained top 15% academic standing globally across university cohort.", bullet_style))
    story.append(Paragraph("• <b>Bursary Recipient:</b> Awarded the prestigious Hollywoodbets and Hollywood Foundation bursary.", bullet_style))
    story.append(Paragraph("• <b>Golden Key International Honour Society:</b> Invited member (Top 15% academic tier).", bullet_style))
    story.append(Paragraph("• <b>National AI Policy Governance:</b> Contributed formal policy feedback to the Department of Communications and Digital Technologies (DCDT) on the Draft South Africa National Artificial Intelligence Policy.", bullet_style))
    story.append(Paragraph("• <b>Global Delegations:</b> Delegate at youth leadership events including the YES Summit.", bullet_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Matriculation (IEB/National Senior Certificate)</b> &nbsp;&nbsp;|&nbsp;&nbsp; <i>De La Salle Holy Cross College High School</i> (Class of 2023)", bold_label_style))

    # Build Document
    doc.build(story)
    print(f"ATS Resume PDF generated successfully at {output_path}")

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else 'public/Michael_Burgers_Resume.pdf'
    generate_ats_resume(target)
