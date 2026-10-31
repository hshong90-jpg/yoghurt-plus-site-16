# Yoghurt+ mobile-first ordering site

A zero-cost static website for Plain Original Milk Kefir (180ml). No payment gateway, hosting, Google Sheet, or receipt verification has been configured. Checkout sends a prefilled WhatsApp message to **+60 11-1094 4168**; the seller confirms delivery and sends payment instructions in chat.

## Run locally

Open `index.html` in a browser, or serve the `outputs` folder with any static web server. For zero-cost hosting, publish the folder using GitHub Pages, Cloudflare Pages, or Netlify's free static hosting. Connect a repository or upload the folder according to the host's current instructions. Set the published site URL as the public link in TikTok bio.

## Products and promotion

- Plain Original Milk Kefir, 180ml only.
- Regular: 1 for RM12, 7 for RM70, 10 for RM90.
- Limited promotion: 5 for RM50 through 30 November 2026, Kuala Lumpur time. After expiry, the 5 bottle bundle is RM60 (five individual bottles at RM12 each).
- Shipping/delivery fee is not included; seller confirms it in WhatsApp.

## Agent referral

Initial public code: `KEFIR10`; share the URL as `https://YOUR-SITE/?ref=KEFIR10`. The checkout captures the code and includes it in the WhatsApp message. Change `REFERRAL_CODE` in `index.html` if the TikTok agent needs a different code. Attribution can also be noted manually in the Sheet.

Commission is 10% of confirmed paid **product sales**. It is not deducted from the customer's price and excludes delivery fees. The included Sheet template uses `=IF(H2="Paid",ROUND(G2*10%,2),0)` to show commission only after a seller marks an order Paid. Referral link use alone does not verify payment.

## Optional Google Sheets order log (free)

1. Create a Google Sheet and name the first tab `Orders`.
2. Add these headers to row 1: `Order ID | Timestamp | Customer | Phone | Address | Summary | Product total (RM) | Payment status | Referral code | Commission (RM) | Receipt follow-up | Notes`.
3. In cell J2 add `=IF(H2="Paid",ROUND(G2*10%,2),0)` and fill down. Keep `Payment status` as `Pending` until you have checked the payment and receipt yourself; then set it to `Paid`. This is a manual record, not payment verification.
4. In the Sheet choose Extensions → Apps Script. Replace the editor contents with `apps-script.gs` from this folder. Save.
5. Deploy → New deployment → Web app. Execute as yourself. Choose access suitable for your use (for a public storefront, “Anyone” allows unauthenticated order submissions; do not store sensitive details you don't need). Authorize and deploy. Copy the Web app URL.
6. In `index.html`, set `SHEETS_ENDPOINT` to that URL, then redeploy the static site. Apps Script's `no-cors` browser request is fire-and-forget: it cannot tell the storefront that the Sheet write succeeded. Verify by placing a test order and checking the Sheet before relying on it.

The site also offers order lookup from browser local storage. That is device-specific and is not shared across customer devices. Use the Sheet/manual WhatsApp chat for cross-device tracking; there is no live customer tracking portal in this static version.

## Product bottle image

The supplied `/mnt/data/5-Day Detox Kefir Challenge.png` was not present in the accessible workspace when the site was built. The hero currently uses a CSS bottle illustration. To use the supplied bottle design, place a web-ready copy beside `index.html` as `product-bottle.png` and replace the `.bottle` illustration inside `.visual` with `<img class="product-image" src="product-bottle.png" alt="Yoghurt+ Plain Original Milk Kefir, 180ml">`; add `.product-image{position:relative;z-index:1;max-height:330px;max-width:70%;object-fit:contain;filter:drop-shadow(0 22px 15px #1f48332b)}` to the stylesheet.
