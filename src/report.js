import _ from 'lodash/fp';

export const kReportFilepath = Symbol('gnosticReportFilepath');

const KNOWN_PROPS = [
  'header',
  'javascriptStack',
  'nativeStack',
  'javascriptHeap',
  'resourceUsage',
  'libuv',
  'environmentVariables',
  'userLimits',
  'sharedObjects'
];

const assignKnownProps = _.curry((source, dest) => {
  _.forEach(prop => {
    dest[prop] = source[prop];
  }, KNOWN_PROPS);
});

export class Report {
  constructor(report, filepath = '(no filepath)') {
    assignKnownProps(report, this);

    this[kReportFilepath] = filepath;
  }

  get filepath() {
    return this[kReportFilepath];
  }

  static create(report, filepath) {
    return Object.freeze(new Report(report, filepath));
  }
}

Report.createFromFile = _.curry((filepath, report) =>
  Report.create(report, filepath)
);
