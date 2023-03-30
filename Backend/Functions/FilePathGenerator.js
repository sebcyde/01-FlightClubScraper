const path = require('path');

const FilePathGenerator = () => {
	const filePath = path.resolve(
		`./${
			new Date().toLocaleDateString().replace(/\//g, '') +
			new Date()
				.toLocaleTimeString('en-GB', {
					hour: 'numeric',
				})
				.replace(/:/g, '')
		}`
	);
	console.log('File Path:', filePath);
	return filePath;
};

module.exports = { FilePathGenerator };
