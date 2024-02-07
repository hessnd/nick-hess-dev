type Props = {
  profile: string;
};

export default function Profile({ profile }: Props) {
  return (
    <section>
      <h2>Profile</h2>
      <p>{profile}</p>
    </section>
  );
}
