# Plasma Token List

A standards-compliant Uniswap Token List for the Plasma networks, used by wallets (e.g., MetaMask) and dApps to discover tokens and logos.

- Canonical list URL: `https://raw.githubusercontent.com/PlasmaLaboratories/plasma-tokenlist/main/plasma.tokenlist.json`
- Schema: Uniswap Token List (validated in CI)

## Chains
- 9745 — Plasma Mainnet (`chainId: 9745`)
- 9746 — Plasma Testnet (`chainId: 9746`)
- 9747 — Plasma Devnet (`chainId: 9747`)

Chain metadata is also published in ethereum-lists/chains under these IDs.

## Tokens Included
Initial release focuses on the native token and its wrapped form:

- Plasma (XPL) — native coin, represented using the common sentinel address for native assets:
  - Address (sentinel): `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`
  - Chains: 9745, 9746, 9747
  - Decimals: 18
  - Logo: `logos/<chainId>/XPL.svg`
- Wrapped Plasma (WXPL) — ERC‑20 wrapped native token (mainnet only):
  - Address (9745): `0x6100E367285b01F48D07953803A2d8dCA5D19873`
  - Decimals: 18
  - Logo: `logos/9745/WXPL.svg`

List-level logo: `logos/9745/XPL.svg`.

## Usage
- Wallets/dApps that support Uniswap Token Lists can add the list by URL (above).
- Programmatic example:
  - Fetch the JSON from the canonical URL and validate against `https://uniswap.org/tokenlist.schema.json`.

## Versioning & Validation
- Versioning follows Uniswap’s SemVer guidance (major removals / minor additions / patch metadata fixes).
- CI validates:
  - JSON schema via `@uniswap/token-lists`
  - EIP‑55 checksums and duplicate detection
  - Logo links (HTTP 200)

## Contributing
- Open an issue/PR for additions or corrections.
- For new tokens, include: name, symbol, decimals, checksummed address, `chainId`, and a logo (SVG/PNG) in `logos/<chainId>/`.

## Links
- Website: `https://plasma.to`
- Explorer (mainnet): `https://plasmascan.to`
- Chain metadata: `https://github.com/ethereum-lists/chains` (IDs 9745–9747)

