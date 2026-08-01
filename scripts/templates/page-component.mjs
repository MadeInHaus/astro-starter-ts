export const pageComponentRoute = name => {
    return `---
import Layout from '@/layouts/Layout.astro';
import ${name}Page from '@/components/pages/${name}/${name}.astro';
---

<Layout>
    <${name}Page />
</Layout>
`;
};

export const pageComponentAstro = name => {
    return `---
import styles from './${name}.module.css';
---

<div class={styles.root}>
    <hgroup>
        <h1>${name}</h1>
        <p>This is the ${name} page.</p>
    </hgroup>
</div>
`;
};

export const pageComponentCSS = () => {
    return `.root {
}

@media (--medium) {
}

@media (--large) {
}
`;
};
