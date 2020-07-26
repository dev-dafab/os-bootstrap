function OsBootstrap () {}

// list all installed packages
// TODO
OsBootstrap.prototype.list_packages = function () {}

// returns true if file exists
// TODO
OsBootstrap.prototype.file_exists = function (file) {}

// returns true if folder is empty
// TODO
OsBootstrap.prototype.folder_empty = function (folder) {}

// Returns true if file is a broken symlink.
// TODO
OsBootstrap.prototype.is_broken_symlink = function (link) {}

// Returns true if file is a symlink pointing to an OSB package.
// TODO
OsBootstrap.prototype.is_osb_symlink = function (link) {}

// Returns true if file is a symlink.
// TODO
OsBootstrap.prototype.is_symlink = function (link) {}

// TODO
OsBootstrap.prototype.link_file = function (link) {}

// TODO
OsBootstrap.prototype.link_rfile = function (link) {}

// TODO
OsBootstrap.prototype.link_files = function (link) {}

// TODO
OsBootstrap.prototype.link_rfiles = function (link) {}

// TODO
OsBootstrap.prototype.cmd_exists = function (link) {}

module.exports.OSB = OsBootstrap
