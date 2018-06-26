import React from 'react';

export default class UploadStatus extends React.Component {

	render() {
		let loaded = this.props.loaded;
		let progress = loaded.toString();
		let progressBar = {width: loaded.toString() + '%'};

		return(
			<table id="progressTable">
				<tbody>
					<tr>
						<th><b><span id="progress">{progress}</span>%</b></th>
						<td>
							<div className="progressBar">
								<div id="progressBar" style={progressBar}></div>
							</div>
							
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}