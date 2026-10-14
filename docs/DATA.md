# Data provenance and interpretation

Dataset: https://data.sf.gov/d/ab4h-6ztd
API: https://data.sfgov.org/resource/ab4h-6ztd.json
Metadata: https://data.sfgov.org/api/views/ab4h-6ztd.json

The original local analysis notebook and the DataSF queries retrieved on 2026-10-14 UTC agree. Saved responses contain aggregate counts only. Each response records its retrieval timestamp and exact query URL.

## Method

- Filter `citation_issued_datetime >= '2025-01-01T00:00:00' AND citation_issued_datetime < '2026-01-01T00:00:00'`.
- Hours: `date_extract_hh(citation_issued_datetime)`, count rows, sort by hour. All 24 hours appear.
- Days: `date_trunc_ymd(citation_issued_datetime)`, count rows, sort by date. All 365 dates appear. Reindex the full calendar year with zero for missing days before weekday means. There are 53 Wednesdays and 52 of each other weekday. Round means to whole citations for display.
- Categories: non-null `violation_desc`, count rows, descending order, limit ten. The total denominator includes all rows, including any null descriptions.
- No deduplication, cancellation filter, or parking-only filter is applied. These are record counts, not independently audited unique citations.
- The issuance field is a Socrata floating/calendar timestamp. Grouping uses its recorded clock values without timezone conversion. Metadata identifies it as issuance date/time but does not establish timezone accuracy or whether particular clock times were defaulted.

## Checks

Hourly and daily totals both equal 1,358,015. All hourly values and all ten category values match their saved API responses. Recomputed weekday means match all seven CSV values. Street cleaning's 531,375 records represent 39.1% of the total. The top ten sum to 1,086,034, approximately 80.0%.

The earlier CSV value of 153,391 for `MTR OUT DT` was a transcription error. Corrected to 159,391 based on both the original notebook output and the new source query. Counts for all other categories were unchanged. Unverified expansions of codes such as MTR OUT DT, RES/OT, METER DTN and PRK GRADE are not presented as established definitions.

## Limits

These historical counts do not estimate per-driver risk, parking availability, safe parking times, or causal effects of enforcement. Hours and weekdays are marginal summaries, not a joint hour-by-weekday analysis. The Tuesday lunch line is personal humor, not a statistical recommendation. Upstream corrections may change future query results.

## Notebook

`notebooks/ticketSF.ipynb` is a cleaned copy of the creator's local starter notebook. The original remains untouched. Contradictory draft notes and an undefined-variable exploratory cell were removed. Saved numerical outputs are retained; this preparation did not rerun Python notebooks. Independent Node.js source checks and tests verify the displayed aggregates. Python packages for rerunning are listed in `notebooks/requirements.txt`.
