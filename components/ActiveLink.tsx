import React, { Children } from 'react';

import Link from 'next/link';
import { SingletonRouter, withRouter } from 'next/router';

interface Props {
  children: JSX.Element;
  activeClassName: string;
  altHref?: string;
  href: string;
  router: SingletonRouter;
}

const ActiveLink = withRouter(
  ({ router, activeClassName, altHref, children, ...props }: Props) => {
    const path = router.pathname;

    const active = (altHref && path.startsWith(altHref)) || path === props.href;

    return (
      <Link {...props} passHref>
        {React.cloneElement(Children.only(children), {
          className: active ? activeClassName : null,
        })}
      </Link>
    );
  },
);

export default ActiveLink;
