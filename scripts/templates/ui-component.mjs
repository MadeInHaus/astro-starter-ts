export const uiComponentAstro = (name, customElementName) => `---
import styles from './${name}.module.scss';

interface Props {
    className?: string;
}

const { className } = Astro.props;
---

<${customElementName}>
    <div class:list={[styles.root, className]}>
    </div>
</${customElementName}>

<script>
    class ${name} extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
        }

        disconnectedCallback() {
        }
    }

    if (!customElements.get('${customElementName}')) {
        customElements.define('${customElementName}', ${name});
    }
</script>
`;

export const uiComponentSCSS = () => `@import '@/styles/breakpoints';

.root {
}
`;
