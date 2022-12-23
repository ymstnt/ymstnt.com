const { interpolate } = require('@prpl/core');

const options = {
  noClientJS: true
};

async function build() {
  await interpolate({ options });
}

build();
