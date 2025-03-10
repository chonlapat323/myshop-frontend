interface ShowcaseCardProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export default function ShowcaseCard({
  title,
  subtitle,
  image,
  link,
}: ShowcaseCardProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <img src={image} alt={title} className="w-full h-auto object-cover" />
      <div className="absolute top-5 left-5 text-black">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{subtitle}</p>
        <a href={link} className="text-blue-600 underline mt-2 block">
          SEE NOW
        </a>
      </div>
    </div>
  );
}
