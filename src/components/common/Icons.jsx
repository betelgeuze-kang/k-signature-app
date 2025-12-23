import * as Icons from 'lucide-react';

export const IconWrapper = ({ name, className, ...props }) => {
    const Icon = Icons[name];
    if (!Icon) return null;
    return <Icon className={className} {...props} />;
};
