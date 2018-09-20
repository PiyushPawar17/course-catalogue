import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Avatar } from 'antd';
import { getUserProfile } from '../actions/authActions';

import '../styles/Profile.css';

class Profile extends React.Component {
	componentDidMount() {
		this.props.getUserProfile();
	}

	render() {
		let profile;
		if (this.props.auth.loading || !this.props.auth.userProfile) {
			profile = <Icon type="loading" />;
		} else {
			profile = (
				<div className="profile">
					<aside className="profile-sidebar">
						<div className="profile-sidebar-data">
							<div className="avatar">
								<Avatar icon="user" size={90} className="avatar-icon" />
							</div>
							<h2 className="profile-sidebar-name">{this.props.auth.userProfile.name}</h2>
						</div>
						<div className="sidenav">
							<ul>
								<li>Favorites</li>
								<li>Submitted Videos</li>
								<li>Submitted Blogs</li>
								<li>Log Out</li>
							</ul>
						</div>
					</aside>
					<main className="profile-details">
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mollis diam.
							Aenean tincidunt quam ac lectus porta sodales. Aliquam iaculis erat lectus, ac
							placerat nisl consequat ac. Proin est lorem, ornare ac pretium a, vulputate vel
							nisi. In metus nibh, sagittis accumsan vestibulum nec, vestibulum eget ligula.
							Phasellus eu faucibus neque. In consectetur et diam at elementum. Ut lorem ante,
							mattis sit amet blandit sit amet, vehicula nec tellus. Sed euismod elit at mattis
							interdum. Sed vel arcu lacinia justo accumsan dictum sed molestie ex. Maecenas et
							convallis neque. Nam nec magna molestie ante eleifend dapibus vitae eget diam.
							Suspendisse justo erat, accumsan ut mattis sit amet, imperdiet non justo. Morbi
							scelerisque elit sit amet ultricies vehicula. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dolor purus,
							ultricies non ligula quis, semper mollis ante. Sed luctus nulla ipsum, sit amet
							laoreet ligula feugiat id. Vestibulum tincidunt scelerisque erat, vel auctor diam
							aliquet in. Orci varius natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec ultrices sagittis blandit. Vestibulum eleifend
							libero eget dui finibus rhoncus. Quisque erat lorem, porttitor nec neque vitae,
							ultrices viverra odio. Donec at mauris eros. Sed interdum ligula non tincidunt
							malesuada. Pellentesque egestas, nunc id porttitor consectetur, arcu urna bibendum
							diam, ac accumsan turpis mi id nibh. Suspendisse id neque pulvinar, tincidunt urna
							nec, tincidunt arcu. Mauris consectetur pulvinar orci et gravida. Duis viverra
							faucibus vulputate. Aliquam erat volutpat. In id pulvinar orci. Morbi elit nunc,
							aliquet sed rhoncus vitae, interdum sed sem. Suspendisse potenti. Maecenas auctor
							sodales felis, sit amet iaculis ligula hendrerit quis. Donec eu eleifend sapien.
							Vivamus odio lorem, fermentum ac vestibulum at, ultricies a velit. Ut ac metus nec
							massa aliquet auctor. Donec a sollicitudin lorem. Nunc vestibulum quam in euismod
							gravida. Curabitur viverra quam vel orci porta aliquet. Proin id euismod odio, ut
							tincidunt orci. Fusce imperdiet auctor maximus. Maecenas auctor massa ut sem
							congue, sed maximus nisi eleifend. Fusce id ultrices mi. In condimentum nisl vitae
							urna pellentesque pharetra. Ut sit amet ultricies mi. Etiam ut velit et sapien
							dignissim facilisis. Praesent porta vel leo ut egestas. Curabitur varius nisi
							tincidunt cursus egestas. Nulla viverra feugiat condimentum. Etiam varius gravida
							diam, eu consequat ante sagittis sed. Nulla sodales lectus quis nisl ullamcorper
							interdum. Ut venenatis malesuada nisi id efficitur. Vestibulum arcu tortor,
							gravida ac felis in, elementum pharetra diam. Praesent ultricies facilisis ipsum,
							quis consectetur justo suscipit eget. Donec rutrum maximus consequat.
						</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mollis diam.
							Aenean tincidunt quam ac lectus porta sodales. Aliquam iaculis erat lectus, ac
							placerat nisl consequat ac. Proin est lorem, ornare ac pretium a, vulputate vel
							nisi. In metus nibh, sagittis accumsan vestibulum nec, vestibulum eget ligula.
							Phasellus eu faucibus neque. In consectetur et diam at elementum. Ut lorem ante,
							mattis sit amet blandit sit amet, vehicula nec tellus. Sed euismod elit at mattis
							interdum. Sed vel arcu lacinia justo accumsan dictum sed molestie ex. Maecenas et
							convallis neque. Nam nec magna molestie ante eleifend dapibus vitae eget diam.
							Suspendisse justo erat, accumsan ut mattis sit amet, imperdiet non justo. Morbi
							scelerisque elit sit amet ultricies vehicula. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dolor purus,
							ultricies non ligula quis, semper mollis ante. Sed luctus nulla ipsum, sit amet
							laoreet ligula feugiat id. Vestibulum tincidunt scelerisque erat, vel auctor diam
							aliquet in. Orci varius natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec ultrices sagittis blandit. Vestibulum eleifend
							libero eget dui finibus rhoncus. Quisque erat lorem, porttitor nec neque vitae,
							ultrices viverra odio. Donec at mauris eros. Sed interdum ligula non tincidunt
							malesuada. Pellentesque egestas, nunc id porttitor consectetur, arcu urna bibendum
							diam, ac accumsan turpis mi id nibh. Suspendisse id neque pulvinar, tincidunt urna
							nec, tincidunt arcu. Mauris consectetur pulvinar orci et gravida. Duis viverra
							faucibus vulputate. Aliquam erat volutpat. In id pulvinar orci. Morbi elit nunc,
							aliquet sed rhoncus vitae, interdum sed sem. Suspendisse potenti. Maecenas auctor
							sodales felis, sit amet iaculis ligula hendrerit quis. Donec eu eleifend sapien.
							Vivamus odio lorem, fermentum ac vestibulum at, ultricies a velit. Ut ac metus nec
							massa aliquet auctor. Donec a sollicitudin lorem. Nunc vestibulum quam in euismod
							gravida. Curabitur viverra quam vel orci porta aliquet. Proin id euismod odio, ut
							tincidunt orci. Fusce imperdiet auctor maximus. Maecenas auctor massa ut sem
							congue, sed maximus nisi eleifend. Fusce id ultrices mi. In condimentum nisl vitae
							urna pellentesque pharetra. Ut sit amet ultricies mi. Etiam ut velit et sapien
							dignissim facilisis. Praesent porta vel leo ut egestas. Curabitur varius nisi
							tincidunt cursus egestas. Nulla viverra feugiat condimentum. Etiam varius gravida
							diam, eu consequat ante sagittis sed. Nulla sodales lectus quis nisl ullamcorper
							interdum. Ut venenatis malesuada nisi id efficitur. Vestibulum arcu tortor,
							gravida ac felis in, elementum pharetra diam. Praesent ultricies facilisis ipsum,
							quis consectetur justo suscipit eget. Donec rutrum maximus consequat.
						</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mollis diam.
							Aenean tincidunt quam ac lectus porta sodales. Aliquam iaculis erat lectus, ac
							placerat nisl consequat ac. Proin est lorem, ornare ac pretium a, vulputate vel
							nisi. In metus nibh, sagittis accumsan vestibulum nec, vestibulum eget ligula.
							Phasellus eu faucibus neque. In consectetur et diam at elementum. Ut lorem ante,
							mattis sit amet blandit sit amet, vehicula nec tellus. Sed euismod elit at mattis
							interdum. Sed vel arcu lacinia justo accumsan dictum sed molestie ex. Maecenas et
							convallis neque. Nam nec magna molestie ante eleifend dapibus vitae eget diam.
							Suspendisse justo erat, accumsan ut mattis sit amet, imperdiet non justo. Morbi
							scelerisque elit sit amet ultricies vehicula. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dolor purus,
							ultricies non ligula quis, semper mollis ante. Sed luctus nulla ipsum, sit amet
							laoreet ligula feugiat id. Vestibulum tincidunt scelerisque erat, vel auctor diam
							aliquet in. Orci varius natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec ultrices sagittis blandit. Vestibulum eleifend
							libero eget dui finibus rhoncus. Quisque erat lorem, porttitor nec neque vitae,
							ultrices viverra odio. Donec at mauris eros. Sed interdum ligula non tincidunt
							malesuada. Pellentesque egestas, nunc id porttitor consectetur, arcu urna bibendum
							diam, ac accumsan turpis mi id nibh. Suspendisse id neque pulvinar, tincidunt urna
							nec, tincidunt arcu. Mauris consectetur pulvinar orci et gravida. Duis viverra
							faucibus vulputate. Aliquam erat volutpat. In id pulvinar orci. Morbi elit nunc,
							aliquet sed rhoncus vitae, interdum sed sem. Suspendisse potenti. Maecenas auctor
							sodales felis, sit amet iaculis ligula hendrerit quis. Donec eu eleifend sapien.
							Vivamus odio lorem, fermentum ac vestibulum at, ultricies a velit. Ut ac metus nec
							massa aliquet auctor. Donec a sollicitudin lorem. Nunc vestibulum quam in euismod
							gravida. Curabitur viverra quam vel orci porta aliquet. Proin id euismod odio, ut
							tincidunt orci. Fusce imperdiet auctor maximus. Maecenas auctor massa ut sem
							congue, sed maximus nisi eleifend. Fusce id ultrices mi. In condimentum nisl vitae
							urna pellentesque pharetra. Ut sit amet ultricies mi. Etiam ut velit et sapien
							dignissim facilisis. Praesent porta vel leo ut egestas. Curabitur varius nisi
							tincidunt cursus egestas. Nulla viverra feugiat condimentum. Etiam varius gravida
							diam, eu consequat ante sagittis sed. Nulla sodales lectus quis nisl ullamcorper
							interdum. Ut venenatis malesuada nisi id efficitur. Vestibulum arcu tortor,
							gravida ac felis in, elementum pharetra diam. Praesent ultricies facilisis ipsum,
							quis consectetur justo suscipit eget. Donec rutrum maximus consequat.
						</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mollis diam.
							Aenean tincidunt quam ac lectus porta sodales. Aliquam iaculis erat lectus, ac
							placerat nisl consequat ac. Proin est lorem, ornare ac pretium a, vulputate vel
							nisi. In metus nibh, sagittis accumsan vestibulum nec, vestibulum eget ligula.
							Phasellus eu faucibus neque. In consectetur et diam at elementum. Ut lorem ante,
							mattis sit amet blandit sit amet, vehicula nec tellus. Sed euismod elit at mattis
							interdum. Sed vel arcu lacinia justo accumsan dictum sed molestie ex. Maecenas et
							convallis neque. Nam nec magna molestie ante eleifend dapibus vitae eget diam.
							Suspendisse justo erat, accumsan ut mattis sit amet, imperdiet non justo. Morbi
							scelerisque elit sit amet ultricies vehicula. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dolor purus,
							ultricies non ligula quis, semper mollis ante. Sed luctus nulla ipsum, sit amet
							laoreet ligula feugiat id. Vestibulum tincidunt scelerisque erat, vel auctor diam
							aliquet in. Orci varius natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec ultrices sagittis blandit. Vestibulum eleifend
							libero eget dui finibus rhoncus. Quisque erat lorem, porttitor nec neque vitae,
							ultrices viverra odio. Donec at mauris eros. Sed interdum ligula non tincidunt
							malesuada. Pellentesque egestas, nunc id porttitor consectetur, arcu urna bibendum
							diam, ac accumsan turpis mi id nibh. Suspendisse id neque pulvinar, tincidunt urna
							nec, tincidunt arcu. Mauris consectetur pulvinar orci et gravida. Duis viverra
							faucibus vulputate. Aliquam erat volutpat. In id pulvinar orci. Morbi elit nunc,
							aliquet sed rhoncus vitae, interdum sed sem. Suspendisse potenti. Maecenas auctor
							sodales felis, sit amet iaculis ligula hendrerit quis. Donec eu eleifend sapien.
							Vivamus odio lorem, fermentum ac vestibulum at, ultricies a velit. Ut ac metus nec
							massa aliquet auctor. Donec a sollicitudin lorem. Nunc vestibulum quam in euismod
							gravida. Curabitur viverra quam vel orci porta aliquet. Proin id euismod odio, ut
							tincidunt orci. Fusce imperdiet auctor maximus. Maecenas auctor massa ut sem
							congue, sed maximus nisi eleifend. Fusce id ultrices mi. In condimentum nisl vitae
							urna pellentesque pharetra. Ut sit amet ultricies mi. Etiam ut velit et sapien
							dignissim facilisis. Praesent porta vel leo ut egestas. Curabitur varius nisi
							tincidunt cursus egestas. Nulla viverra feugiat condimentum. Etiam varius gravida
							diam, eu consequat ante sagittis sed. Nulla sodales lectus quis nisl ullamcorper
							interdum. Ut venenatis malesuada nisi id efficitur. Vestibulum arcu tortor,
							gravida ac felis in, elementum pharetra diam. Praesent ultricies facilisis ipsum,
							quis consectetur justo suscipit eget. Donec rutrum maximus consequat.
						</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mollis diam.
							Aenean tincidunt quam ac lectus porta sodales. Aliquam iaculis erat lectus, ac
							placerat nisl consequat ac. Proin est lorem, ornare ac pretium a, vulputate vel
							nisi. In metus nibh, sagittis accumsan vestibulum nec, vestibulum eget ligula.
							Phasellus eu faucibus neque. In consectetur et diam at elementum. Ut lorem ante,
							mattis sit amet blandit sit amet, vehicula nec tellus. Sed euismod elit at mattis
							interdum. Sed vel arcu lacinia justo accumsan dictum sed molestie ex. Maecenas et
							convallis neque. Nam nec magna molestie ante eleifend dapibus vitae eget diam.
							Suspendisse justo erat, accumsan ut mattis sit amet, imperdiet non justo. Morbi
							scelerisque elit sit amet ultricies vehicula. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dolor purus,
							ultricies non ligula quis, semper mollis ante. Sed luctus nulla ipsum, sit amet
							laoreet ligula feugiat id. Vestibulum tincidunt scelerisque erat, vel auctor diam
							aliquet in. Orci varius natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec ultrices sagittis blandit. Vestibulum eleifend
							libero eget dui finibus rhoncus. Quisque erat lorem, porttitor nec neque vitae,
							ultrices viverra odio. Donec at mauris eros. Sed interdum ligula non tincidunt
							malesuada. Pellentesque egestas, nunc id porttitor consectetur, arcu urna bibendum
							diam, ac accumsan turpis mi id nibh. Suspendisse id neque pulvinar, tincidunt urna
							nec, tincidunt arcu. Mauris consectetur pulvinar orci et gravida. Duis viverra
							faucibus vulputate. Aliquam erat volutpat. In id pulvinar orci. Morbi elit nunc,
							aliquet sed rhoncus vitae, interdum sed sem. Suspendisse potenti. Maecenas auctor
							sodales felis, sit amet iaculis ligula hendrerit quis. Donec eu eleifend sapien.
							Vivamus odio lorem, fermentum ac vestibulum at, ultricies a velit. Ut ac metus nec
							massa aliquet auctor. Donec a sollicitudin lorem. Nunc vestibulum quam in euismod
							gravida. Curabitur viverra quam vel orci porta aliquet. Proin id euismod odio, ut
							tincidunt orci. Fusce imperdiet auctor maximus. Maecenas auctor massa ut sem
							congue, sed maximus nisi eleifend. Fusce id ultrices mi. In condimentum nisl vitae
							urna pellentesque pharetra. Ut sit amet ultricies mi. Etiam ut velit et sapien
							dignissim facilisis. Praesent porta vel leo ut egestas. Curabitur varius nisi
							tincidunt cursus egestas. Nulla viverra feugiat condimentum. Etiam varius gravida
							diam, eu consequat ante sagittis sed. Nulla sodales lectus quis nisl ullamcorper
							interdum. Ut venenatis malesuada nisi id efficitur. Vestibulum arcu tortor,
							gravida ac felis in, elementum pharetra diam. Praesent ultricies facilisis ipsum,
							quis consectetur justo suscipit eget. Donec rutrum maximus consequat.
						</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mollis diam.
							Aenean tincidunt quam ac lectus porta sodales. Aliquam iaculis erat lectus, ac
							placerat nisl consequat ac. Proin est lorem, ornare ac pretium a, vulputate vel
							nisi. In metus nibh, sagittis accumsan vestibulum nec, vestibulum eget ligula.
							Phasellus eu faucibus neque. In consectetur et diam at elementum. Ut lorem ante,
							mattis sit amet blandit sit amet, vehicula nec tellus. Sed euismod elit at mattis
							interdum. Sed vel arcu lacinia justo accumsan dictum sed molestie ex. Maecenas et
							convallis neque. Nam nec magna molestie ante eleifend dapibus vitae eget diam.
							Suspendisse justo erat, accumsan ut mattis sit amet, imperdiet non justo. Morbi
							scelerisque elit sit amet ultricies vehicula. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dolor purus,
							ultricies non ligula quis, semper mollis ante. Sed luctus nulla ipsum, sit amet
							laoreet ligula feugiat id. Vestibulum tincidunt scelerisque erat, vel auctor diam
							aliquet in. Orci varius natoque penatibus et magnis dis parturient montes,
							nascetur ridiculus mus. Donec ultrices sagittis blandit. Vestibulum eleifend
							libero eget dui finibus rhoncus. Quisque erat lorem, porttitor nec neque vitae,
							ultrices viverra odio. Donec at mauris eros. Sed interdum ligula non tincidunt
							malesuada. Pellentesque egestas, nunc id porttitor consectetur, arcu urna bibendum
							diam, ac accumsan turpis mi id nibh. Suspendisse id neque pulvinar, tincidunt urna
							nec, tincidunt arcu. Mauris consectetur pulvinar orci et gravida. Duis viverra
							faucibus vulputate. Aliquam erat volutpat. In id pulvinar orci. Morbi elit nunc,
							aliquet sed rhoncus vitae, interdum sed sem. Suspendisse potenti. Maecenas auctor
							sodales felis, sit amet iaculis ligula hendrerit quis. Donec eu eleifend sapien.
							Vivamus odio lorem, fermentum ac vestibulum at, ultricies a velit. Ut ac metus nec
							massa aliquet auctor. Donec a sollicitudin lorem. Nunc vestibulum quam in euismod
							gravida. Curabitur viverra quam vel orci porta aliquet. Proin id euismod odio, ut
							tincidunt orci. Fusce imperdiet auctor maximus. Maecenas auctor massa ut sem
							congue, sed maximus nisi eleifend. Fusce id ultrices mi. In condimentum nisl vitae
							urna pellentesque pharetra. Ut sit amet ultricies mi. Etiam ut velit et sapien
							dignissim facilisis. Praesent porta vel leo ut egestas. Curabitur varius nisi
							tincidunt cursus egestas. Nulla viverra feugiat condimentum. Etiam varius gravida
							diam, eu consequat ante sagittis sed. Nulla sodales lectus quis nisl ullamcorper
							interdum. Ut venenatis malesuada nisi id efficitur. Vestibulum arcu tortor,
							gravida ac felis in, elementum pharetra diam. Praesent ultricies facilisis ipsum,
							quis consectetur justo suscipit eget. Donec rutrum maximus consequat.
						</div>
						{/* <Button>
							<Link to="/tutorials/new">Submit a tutorial</Link>
						</Button> */}
					</main>
				</div>
			);
		}

		return <div>{profile}</div>;
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getUserProfile }
)(Profile);
