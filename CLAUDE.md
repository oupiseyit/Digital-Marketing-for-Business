# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this folder is

Not a software project, despite living under `002-Laravel/projects/`. There is no code, build, lint, or test setup, and no git repo. It holds study and teaching materials for an 8-week **Digital Marketing for Business** course. The owner takes the course and prepares to teach it later.

Note: the folder name ends with a trailing space (`Digital Marketing for Business `), so quote paths in shell commands.

## Files

- `Ch1_Introduction to Digital Marketing.pdf` (53 pp) and `Marketing 7.0.pdf` (44 pp): course slide decks covering the evolution from Marketing 1.0 to 7.0. These are the source material.
- `Digital_Marketing_8_Week_Learning_and_Teaching_Notes.docx`: the course plan. Weeks run: 1 Intro, 2 Strategy (SMART/SWOT/personas), 3 Social Media, 4 Content & SEO, 5 Digital Ads, 6 Email & E-commerce, 7 Analytics & KPIs (GA4, UTM, CTR, CPC, CPM, CPA, ROAS), 8 Planning & Final Project. Each week has a practical activity and a note-taking checklist.
- `Digital_Marketing_Ch1_QA_English_Khmer.docx`: 30 bilingual Q&A items based on the Ch1 PDF. This is the house format for derived handouts.
- `Links.xlsx`: a reference list of example videos and posts (columns: No, Title, Link), mostly YouTube and Facebook, with some Khmer titles.

## Conventions for generated materials

- Handouts are bilingual **English + Khmer**. Each item is numbered (`01.`), followed by the English question, the Khmer question (`សំណួរ៖`), the English answer (`Answer:`), and the Khmer answer (`ចម្លើយ៖`). Keep marketing terms such as "Marketing 4.0", "Outbound Marketing" and "4Ps" in English inside the Khmer text.
- Ground the content in the course PDFs, and name the source PDF in the subtitle (for example, "Based on Ch1_Introduction to Digital Marketing.pdf").
- Deliver handouts as `.docx`, named like `Digital_Marketing_Ch<N>_<Topic>_English_Khmer.docx`.
- To read files on macOS without extra tools, use `textutil -convert txt -stdout <file>.docx` for DOCX and `unzip -p Links.xlsx xl/sharedStrings.xml` for XLSX. Use the Read tool with `pages` for the PDFs.
