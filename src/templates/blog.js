import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {getPages, Link, safePrefix} from '../utils';

export default class Blog extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <div className="outer">
              <div className="inner">
                <div className="post-feed">
                  {_.map(display_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-card-inside">
                      {post.frontmatter.thumb_img_path && 
                      <Link className="post-card-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                        <img className="thumbnail" src={safePrefix(post.frontmatter.thumb_img_path)} alt={post.frontmatter.title} />
                      </Link>
                      }
                      <div className="post-card-content">
                        <header className="post-header">
                          <h2 className="post-title"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{post.frontmatter.title}</Link></h2>
                        </header>
                        <div className="post-excerpt">
                          <p>{post.frontmatter.excerpt}</p>
                        </div>
                        <footer className="post-meta">
                          <time className="published"
                            datetime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
                        </footer>
                      </div>
                    </div>
                  </article>
                  ))}
                </div>
              </div>
            </div>
            </Layout>
        );
    }
}
