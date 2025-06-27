// pages/docs/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import DocsLayout from '../../components/docs/DocsLayout';
import { docsSidebar } from '../../data/docsNav';

type Props = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: docsSidebar.map((d) => ({ params: { slug: d.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  return { props: { slug: params!.slug as string } };
};

export default function DocsPage({ slug }: Props) {
  // Dynamic import for MDX content
  const Content = dynamic(() => import(`../../content/docs/${slug}.mdx`));

  return (
    <DocsLayout>
      <article className="prose prose-invert max-w-none">
        <Content />
      </article>
    </DocsLayout>
  );
}