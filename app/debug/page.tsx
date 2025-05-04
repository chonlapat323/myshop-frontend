export default function Debug() {
  return (
    <pre>
      {JSON.stringify({
        env: process.env.NODE_ENV,
        image:
          "https://apis.paodev.xyz/uploads/slides/temp-1746373735069-988808620.png",
      })}
    </pre>
  );
}
