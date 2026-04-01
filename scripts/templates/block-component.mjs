export const blockComponentAstro = (name, customElementName) => `---
import styles from './${name}.module.css';

interface Props {
    className?: string;
}

const { className } = Astro.props;
---

<${customElementName}>
    <div class:list={[styles.root, className]}></div>
</${customElementName}>

<script>
    class ${name} extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {}

        disconnectedCallback() {}
    }

    if (!customElements.get('${customElementName}')) {
        customElements.define('${customElementName}', ${name});
    }
</script>
`;

export const blockComponentAstroExternalTS = (name, customElementName) => `---
import styles from './${name}.module.css';

interface Props {
    className?: string;
}

const { className } = Astro.props;
---

<${customElementName} class:list={[styles.root, className]}>
</${customElementName}>

<script>
    import ${name} from './${name}';

    if (!customElements.get('${customElementName}')) {
        customElements.define('${customElementName}', ${name});
    }
</script>
`;

export const blockComponentTS = name => `export default class ${name} extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {}

    disconnectedCallback() {}
}
`;

export const blockComponentCSS = () => `@import '@/styles/breakpoints.css';

.root {
}

@media (--medium) {
}

@media (--large) {
}
`;
