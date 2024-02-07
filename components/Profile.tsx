import React from 'react';

type Props = {
  profile: string;
};

const Profile = ({ profile }: Props) => (
  <section>
    <h2>Profile</h2>
    <p>{profile}</p>
  </section>
);

export default Profile;
