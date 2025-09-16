# Plasma Token List

A standards-compliant Uniswap Token List for the Plasma networks, used by wallets (e.g., MetaMask) and dApps to discover tokens and logos.

- Canonical list URL: `https://raw.githubusercontent.com/PlasmaLaboratories/plasma-tokenlist/main/plasma.tokenlist.json`
- Schema: Uniswap Token List (validated)

## Chains
- 9745 — Plasma Mainnet (`chainId: 9745`)
- 9746 — Plasma Testnet (`chainId: 9746`)
- 9747 — Plasma Devnet (`chainId: 9747`)

Chain metadata is also published in ethereum-lists/chains for these IDs.

## Current Release — v1.1.0
- Scope: add core ecosystem tokens on 9745, unify logos, and use proxy addresses for upgradeable tokens.
- Tokens (9745): XPL (native), WXPL, ENA, USDe, sUSDe, WETH, USDai, sUSDAI, XAUT0, USD₮0, weETH
  - Native XPL uses the sentinel address `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE` (for 9745/9746/9747).
  - Upgradeable ERC‑20s are listed by their proxy addresses.
- Logos:
  - WXPL now uses the unified XPL logo (`logos/9745/XPL.svg`).
  - Trust Wallet PNGs (copied locally) for ENA, USDe, sUSDe, WETH, USD₮0, XAUt, weETH.
  - Issuer brand SVGs for USDai and sUSDAI.

## Usage
- Wallets/dApps that support Uniswap Token Lists can add the list by URL (above).
- Programmatic validation example:
  - Schema: `npx ajv-cli validate -s token-lists/src/tokenlist.schema.json -d plasma.tokenlist.json`
  - Checksums: `node -e "const {toChecksumAddress}=require('web3-utils');const l=require('./plasma.tokenlist.json');for(const t of l.tokens){if(t.address!==toChecksumAddress(t.address))throw new Error('Bad checksum '+t.address)}console.log('OK')"`

## Versioning & Validation
- Versioning follows Uniswap’s SemVer guidance:
  - Major: remove tokens or change token address/chainId (for previously published tokens)
  - Minor: add tokens (this release)
  - Patch: metadata updates (name, symbol, logo, decimals)
- Validation covers:
  - Uniswap JSON schema
  - EIP‑55 checksums and duplicate detection
  - Logo links (HTTP 200)

## Logos
- Stored locally under `logos/<chainId>/<address>.(png|svg)` and referenced via raw GitHub URLs.
- Preference: issuer-approved SVG; otherwise Trust Wallet PNG; fallback to placeholder until official art is available.
- XPL and WXPL use the same unified logo.

## Contributing
- Open an issue/PR for additions or corrections.
- For new tokens, include: name, symbol, decimals, checksummed address, `chainId`, and a logo (SVG/PNG) in `logos/<chainId>/`.

## Links
- Website: `https://plasma.to`
- Explorer (mainnet): `https://plasmascan.to`
- Chain metadata: `https://github.com/ethereum-lists/chains` (IDs 9745–9747)
