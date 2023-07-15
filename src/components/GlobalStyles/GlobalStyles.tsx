import './GlobalStyles.scss';

type Props = {
    children: React.ReactElement;
};

function GlobalStyles(props: Props) {
    return <>{props.children}</>;
}

export default GlobalStyles;