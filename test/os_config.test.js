const assert = require("assert");
const sinon = require("sinon");
const expect = require("chai").expect;
var proxyquire = require("proxyquire");

describe("OS Properties Set Suite Linux", () => {
  let os_config;
  let osStub = {};
  osStub.platform = () => "linux";

  before(() => {
    os_config = proxyquire("../src/os/os_config", { os: osStub });
  });

  it("platfform should be linux", () => {
    expect(os_config.platform).to.equal("linux");
  });

  it("install command should contains apt-get", () => {
    expect(os_config.install_command).to.contain("apt-get");
  });
});

describe("OS Properties Set Suite OSX", () => {
  let os_config;
  let osStub = {};
  osStub.platform = () => "darwin";

  beforeEach(() => {
    os_config = proxyquire("../src/os/os_config", { os: osStub });
  });

  it("platfform should be darwin", () => {
    expect(os_config.platform).to.equal("darwin");
  });

  it("install command should contains brew", () => {
    expect(os_config.install_command).to.contain("brew");
  });
});
