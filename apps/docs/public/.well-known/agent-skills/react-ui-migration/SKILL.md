---
name: react-ui-migration
description: Migrate between react-ui major versions or address breaking changes in component APIs.
---

# react-ui Migration Guide

Migrate react-ui projects between major versions or adapt to breaking changes.

## When to use

- Upgrading react-ui to a new major version
- Fixing breaking changes after an upgrade
- Adapting existing component usage to new APIs

## Current status

- react-ui is currently at version `0.0.1` (pre-release)
- API is still stabilizing; breaking changes may occur between minor versions
- Not yet recommended for production use

## General migration steps

1. Review the `CHANGELOG.md` for the target version
2. Update `@xiaoye-react/ui` and `@xiaoye-react/hooks` in your `package.json`
3. Run the test suite and fix any failing tests
4. Check for deprecated APIs in component documentation
5. Update `UIProvider` configuration if theme APIs changed

## Notes

- All components require `UIProvider` wrapping; this is unchanged across versions
- CSS variables use the `--ui-*` prefix consistently
- Component variants (`filled`, `light`, `outline`, `subtle`, `transparent`, `default`, `white`, `gradient`) are stable
