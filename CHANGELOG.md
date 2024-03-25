# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.45.1] - 2024-03-25
### Fixed
- Added ids to exchanges `/period-comparator` page and removed unused fields to potentially fix auto refetch query.

## [1.45.0] - 2024-03-25
### Added
- Gas and water to `/period-comparator` page.

### Fixed
- SideNav `/period-comparator` page icon.

## [1.44.2] - 2024-03-24
### Fixed
- Header menu button title and navigation layout bugs.

## [1.44.1] - 2024-03-24
### Fixed
- Todays solar received widget correct value (api now supports start and and values).

## [1.44.0] - 2024-03-23
### Added
- Simle period comparator page. To compare previous and current year electricity values.

## [1.43.1] - 2024-03-22
### Added
- SolarInverter api breading change, from ipAddress to url.

## [1.43.0] - 2024-02-18
### Added
- Data retention settings for removing old data on Smart meter settings page.

### Changed
- Improved label readability for charts.
- 8 hour electricity chart from area to line chart.

## [1.42.4] - 2024-02-16
### Fixed
- Build failed because of stricter typing.

## [1.42.3] - 2024-02-16
### Fixed
- Charts components `includePrevious` options now correctly calculates previous time span.

## [1.42.2] - 2023-02-20
### Fixed
- Invisible tooltips can now be clicked through.

## [1.42.1] - 2022-12-23
### Fixed
- ToolTip y position.
- Correct severity for alert box.

## [1.42.0] - 2022-12-22
### Added
- Tooltips for single value widgets and settings header button.
- Docker `latest` tag for docker deploy.

### Fixed
- Smart Meter settings page when no data.

## [1.41.0] - 2022-12-16
### Changed
- Improved message or alert boxes.

### Fixed
- 404 page.

## [1.40.6] - 2022-12-06
### Fixed
- Docker: removing args (not useable on Docker hub) and build in CMD step.

## [1.40.5] - 2022-12-06
### Fixed
- Removed Dockerfile from .dockerignore for `REACT_APP_API_ENDPOINT` build ARG to ENV (potential fix).

## [1.40.4] - 2022-12-06
### Fixed
- `REACT_APP_API_ENDPOINT` build ARG to ENV (potential fix).

## [1.40.3] - 2022-12-05
### Fixed
- `REACT_APP_API_ENDPOINT` build ARG.

## [1.40.2] - 2022-12-05
### Fixed
- Docker image by running the build.

## [1.40.1] - 2022-12-05
### Fixed
- Docker tag versioning.

## [1.40.0] - 2022-12-05
### Added
- Docker support (experimental).

## [1.39.0] - 2022-11-26
### Added
- Solar stats to electricity month and year widgets.

## [1.38.0] - 2022-11-18
### Added
- Water month and year widgets.

## [1.37.0] - 2022-11-12
### Changed
- Improved loading states for event list.
- Swapped water week widget for an updated one with previous week results.

## [1.36.0] - 2022-10-22
### Changed
- Better queries for day usage widgets.

### Fixed
- Side nav active highlight for dashboard.
- Dashboard widget usage current loading state.

## [1.35.1] - 2022-10-18
### Fixed
- Dashboard widget loading state.

## [1.35.0] - 2022-10-18
### Added
- Event archive button.

### Changed
- Updated npm packages.

### Fixed
- Typo label week electricity chart.
- Refreshing some widgets on revisit page.

## [1.34.0] - 2022-09-30
### Added
- Added solar to week chart.

## [1.33.1] - 2022-09-08
### Fixed
- Hardcoding paging events to 4 results per page.

## [1.33.0] - 2022-09-08
### Changed
- Events paging.
- When api is down on initial loading application shows error message.

## [1.32.1] - 2022-06-01
### Fixed
- Side Nav for non mobile screen sizes.

## [1.32.0] - 2022-05-31
### Added
- Side Nav.

### Changed
- Split widgets between pages.

## [1.31.1] - 2022-02-15
### Fixed
- Eslint error (build).

## [1.31.0] - 2022-02-15
### Added
- Profile page for editing your name.

### Fixed
- Used and solar colors for light theme.
- Show 0 for CurrentSolarPowerGenerating when 0 is returned from api.

## [1.30.1] - 2022-02-11
### Fixed
- Show '-' when no value for solar.
- TypeError on electricity chart widget.

## [1.30.0] - 2022-02-10
### Added
- Polling for today widget values.

## [1.29.1] - 2022-02-09
### Fixed
- Blank profile/event page.

## [1.29.0] - 2022-02-09
### Added
- Paging for event list.

### Fixed
- Solar power widget for portal page.

## [1.28.0] - 2022-02-02
### Added
- Solar power to 8 hour dashboard widget.

## [1.27.2] - 2022-01-30
### Fixed
- No value when 0 for used and using widgets.

## [1.27.1] - 2022-01-30
### Fixed
- Used today widget no value when no data.
- No solar widget on Portal page when no solar inverters.

## [1.27.0] - 2022-01-29
### Added
- Solar inverter online status.

### Changed
- Solar widget do not show when there are no solar inverters added.

## [1.26.0] - 2022-01-20
### Changed
- Soft max changed for electricity week chart.
- Updated dependencies.

## [1.25.0] - 2022-01-11
### Added
- Electricity used today widget.
- Electricity using current widget.

## [1.24.3] - 2022-01-09
### Fixed
- Previous period for gas month chart, offset by one month.

## [1.24.2] - 2022-01-09
### Fixed
- Linting error.

## [1.24.1] - 2022-01-09
### Fixed
- Linting error.

## [1.24.0] - 2022-01-09
### Added
- Include previous period for gas month charts.

### Fixed
- Grammar.

## [1.23.0] - 2022-01-08
### Added
- Solar inverter settings page where you can add solar inverters and see current and total yield.

## [1.22.0] - 2022-01-03
### Added
- Loading page.
- Polling for current electricity widgets.

### Fixed
- Portal logged out page.
- Refreshing widgets on Dashboard.

## [1.21.1] - 2022-01-01
### Fixed
- Wrong polling for all widgets, only polling for solar now.

## [1.21.0] - 2022-01-01
### Added
- Polling to current electricity and solar widgets.

### Fixed
- Login form redirect after login.

## [1.20.1] - 2022-01-01
### Fixed
- Last updated for current solar power widget.

## [1.20.0] - 2022-01-01
### Added
- Current solar power and today solar power widgets.

### Changed
- Auth for breaking changes API.
- Updated packages and changed code to reflect breaking changes.

## [1.19.1] - 2021-12-17
### Fixed
- Build error.

## [1.19.0] - 2021-12-17
### Changed
- Gas color.
- Updated dependencies.

## [1.18.1] - 2021-12-12
### Fixed
- Series display in some charts.

## [1.18.0] - 2021-12-12
### Added
- Previous week reading for electricity week chart.

### Changed
- Chart legend labels.

## [1.17.0] - 2021-12-11
### Added
- Previous week reading for gas week chart.

## [1.16.0] - 2021-11-22
### Added
- Gas usage year widget on dashboard.

### Changed
- Lazy loading all charts (intersections observer).

## [1.15.0] - 2021-11-20
### Added
- Year electricity widget with intersections observer (lazy loading).
- Lazy loading month electricity widget (intersections observer).

### Fixed
- Improvements header modal.

## [1.14.2] - 2021-11-14
### Fixed
- Removed Year widget because of performance issues.

## [1.14.1] - 2021-11-14
### Fixed
- Electricity year widget by using the new features in API version 2.1.0.

## [1.14.0] - 2021-11-08
### Added
- Electricity year widget.
- User header modal.

## [1.13.0] - 2021-05-24
### Changed
- **Needs API version >= 2.0** Refactor for breaking changes on the API.
- Updated Apollo Client.

## [1.12.0] - 2021-05-23
### Added
- Electricity received to month chart.
- Last updated time for current electricity delivered and received widgets.

### Removed
- All widgets (except actual receiving and delivering widgets) on portal page (home page when logged out).

## [1.11.0] - 2021-05-13
### Added
- Current water meter reading on settings page.
- Formatting numbers with correct decimal and thousand separators bases on browser language setting.

### Changed
- Improved chart loading state styling for smaller screen sizes.

## [1.10.2] - 2021-05-08
### Fixed
- Gas & electricity month widgets wrong month order and labels.

## [1.10.1] - 2021-05-08
### Fixed
- Re-fetching data loop for electricity 8 hours chart.

## [1.10.0] - 2021-05-08
### Added
- Water received week chart added to dashboard page.
- Descriptions on water and mindergas.nl settings pages.

### Changed
- Nicer skeleton loading for charts.
- Electricity received and delivered in one chart.

### Fixed
- Time 8 hour electricity and 4 day gas chart was not updating on navigating back to the dashboard page.

### Removed
- Rounding for month widgets.

## [1.9.0] - 2021-05-02
### Changed
- All Consumption queries to new Exchange queries.

## [1.8.0] - 2021-05-02
### Added
- Background color for values without data points in the electricity chart and gas chart.

### Changed
- Cache data for user avatar in memory.
- Better error feedback add verified water reading form.
- More accurate electricity 8 hour chart.
- Combined delivered and received electricity in one chart.

### Fixed
- Add verified water readings required field.

## [1.7.2] - 2021-04-27
### Fixed
- MinderGas.nl synchronization checkbox toggle.

## [1.7.1] - 2021-04-27
### Fixed
- Re-fetching queries in a loop: global default caching for network requests is now no-cache.

## [1.7.0] - 2021-04-26
### Added
- Smart Meter settings page with general info from the Smart Meter.
- Custom favicon image.

### Changed
- More accurate 4 day gas widget (same day total).
- Improved forms and inputs (layout and usability).

### Removed
- Rounding values for 4 day gas usage chart because they are already.

### Fixed
- Login form button not working.

## [1.6.1] - 2021-04-22
### Fixed
- Wrong unit (kWh) in gas week chart widget.
- Missing values for gas 4 day chart because of rounding to zero.

## [1.6.0] - 2021-04-21
### Added
- Current week Gas received widget.

### Changed
- Updated dependencies.
- Updated existing portal page widgets to be the same as the dashboard page.
- Week widgets now show all days of the week instead of only the current and previous days.

## [1.5.0] - 2021-04-18
### Added
- Current week Electricity received widget.

### Changed
- Better error messages for most components inside widgets.

### Fixed
- Fatal for 2 widgets when getting invalid data from api.

## [1.4.0] - 2021-04-16
### Added
- Add verified water reading form, for correcting the water sensor.

### Changed
- Updated dependencies.

## [1.3.1] - 2021-04-15
### Fixed
- Fetch delivered received chart widgets infinite loop.

## [1.3.0] - 2021-04-14
### Added
- Electricity delivered 8 hours chart widget for dashboard.

### Changed
- Bolt icons for delivered and received.
- Widget titles for delivered and received electricity.

## [1.2.0] - 2021-04-13
### Added
- About settings page with app en server version numbers.

### Fixed
- Vertical text overflow on settings nav button text.

## [1.1.0] - 2021-04-12
### Added
- Settings page.
- Water Reader settings page.
- EventList loading indication.

### Changed
- Moved minder-gas-nl page to settings menu.

## [1.0.0] - 2021-04-10