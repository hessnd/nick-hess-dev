import React from 'react';

type Props = {
  profile: string;
};

const Profile = ({ profile }: Props) => (
  <section className="profile">
    <h2 className="header border-bottom">Profile</h2>
    <p className="body">{profile}</p>
  </section>
);

export default Profile;
