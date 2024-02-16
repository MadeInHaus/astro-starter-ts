export const pageComponentRoute = name => {
    return `---
import Layout from '@/layouts/Layout.astro';
import ${name} from '@/components/pages/${name}/${name}.astro';
---

<Layout>
    <${name} />
</Layout>
';
`;
};

export const pageComponentAstro = name => {
    return `---
import grid from '@/styles/modules/grid.module.scss';
import styles from './${name}.module.scss';
---

<div class:list={[styles.root, grid.container]}>
    <hgroup class={styles.header}>
        <h1>${name}</h1>
        <p>This is the ${name} page.</p>
    </hgroup>
</div>
`;
};

export const pageComponentSCSS = () => {
    return `@import '@/styles/breakpoints';

.root {
}

.header {
    grid-column: 1 / -1;
}

@include medium {
}

@include large {
}
`;
};
