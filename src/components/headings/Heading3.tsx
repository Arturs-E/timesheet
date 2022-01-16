import React, { FC } from 'react';

type Heading3Props = {
  children: string;
}

const Heading3:FC<Heading3Props> = ({ children }): JSX.Element => (
  <h3 className="heading3">{children}</h3>
);

export default Heading3;
