const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const os = require('os');
const readline = require('readline');

const dofiles_dir = path.resolve(__dirname)
const OS          = os.platform();
const is_nix = OS === 'linux';
const is_mac = OS === 'darwin';
const is_win = OS === 'win32';
const INSTALL_CMD = is_mac ? 'yes && brew install ' : 'yes && sudo apt-get install ';
const homeDir = path.resolve(process.env['HOME']);

const dateNow = new Date(Date.now());
const BACK_UP_DIR = homeDir + "/dotfiles_backup_" + dateNow.toLocaleDateString() + "_" + dateNow.toLocaleTimeString();

const Logger = () => {
	const Log = ( messages, Color  ) => {
		for(let i=0; i<messages.length; i++) {
			console.log(messages[i]);
		}
	}
	const Error = ()=> {};
	const Warning = () => {};
	const Success = () => {};

	return {
		Error: Error,
		Warning: Warning,
		Success: Success
	};
};


const changeToZSH = () => {
	let shell = process.env['SHELL'];
	if(shell && shell.search('zsh') === -1) {
		exec('which zsh', (err, out, outErr)=>{
			if(!err) {
				exec('chsh -s ' + out, (err, out, outErr)=>{
					console.log("Change to ZSH");
				});
			}
		});
	}
};

const installFonts = () => {
	const rl = readline.createInterface({
		input: process.stdin
	});

rl.question('Do you want to install fonts (y/n)?  ', (answer) => {
	if(answer === "" || answer.trim().search('y') !== -1) {
			console.log("installing Fonts");
			exec('bash ~/dotfiles/fonts/install.sh', (err, out, outErr)=>{
				if(!err) {
					console.log("Beloved Fonts installed");
				}
			});
  }
	else if(answer.trim().search('n') !== -1) {
			console.log("Skip installing Fonts");
  }
	else {}
	rl.close();
});
};

const installPackages = function() {
	const df = require('./dependencies.json');
	let keys = Object.keys(df);
	keys.forEach(key => {
		let val = df[key];
		console.log(val);
	});
};

const backupDotfiles = (filename) => {
	if(fs.existsSync(filename)) {
		if(!fs.existsSync(BACK_UP_DIR)) {
			fs.mkdirSync(BACK_UP_DIR);
		}
		fs.lstat(filename, (err, stat)=> {
			if(!err) {
				if(stat.isSymbolicLink()) {
					fs.unlink(filename, err => {
						if(err) console.error("Symlink cannot be deleted");
										console.log("Symlink was deleted successfully");
					});
				}
				else {
					fs.rename(filename, BACK_UP_DIR + "/" + path.basename(filename));
				}
			}
		})
	}
};

let default_handler = ( err, stdout, stderr ) => {
	 if ( err != null ) {
				console.log(stderr);
				return;
	 }
	 console.log(stdout);
};

let exec_command = function( command, args, handler = default_handler) {
	exec( command  + ' ' + args, handler);
};


let parse_dotfiles = function() {
	const jf = require('./dotfiles.json');

	const handler_dotfile = (err, files, stderr) => {
		let arr_files = 
			files.split("\n")
			.filter(e=>e!=''&&
							e!='README.md'&&
							e!='install.js'&&
							e!='install'&&
							e!='install.sh'&&
							e!='dotfiles.json'&&
							e!='dependencies.json');

			arr_files.map( file => {
				if(jf[file]) {
					Object.keys(jf[file])
						.map( key =>{
							let abs_path = path.resolve(key);
							//console.log(abs_path, "=>", jf[file][key]);
							// TODO : Link files
						})
				}
			})
	}
	exec_command('ls', '.', handler_dotfile);
};

//changeToZSH(); //DONE
//installFonts(); //DONE
installPackages();
//parse_dotfiles();
