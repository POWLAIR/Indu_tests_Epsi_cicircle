type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: `Post: ${params.slug}` };
}

type Props = {
  params: { slug: string }
}

export default function BlogPost({ params }: Props) {
  return <h1>Slug: {params.slug}</h1>;
}
