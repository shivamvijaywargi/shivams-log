import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import marked from 'marked';
import Link from 'next/link';

export default function PostPage({
  frontmatter: { title, cover_image, date },
  slug,
  content,
}) {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>
      <div className="card card-page">
        <div className="post-title">{title}</div>
        <div className="post-date">{date}</div>
        <img src={cover_image} alt={title} />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return {
    paths,
    fallback: false,
  };
}
