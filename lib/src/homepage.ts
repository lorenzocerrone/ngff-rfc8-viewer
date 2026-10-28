import { CSS_CLASS_PREFIX } from './constants';

const EXAMPLES_BASE =
  'https://raw.githubusercontent.com/lorenzocerrone/ngff-rfc8-viewer/main/examples/data';

const NGIO_COLLECTIONS_BASE =
  'https://raw.githubusercontent.com/BioVisionCenter/ngio-collections/rfc8-revision1/examples/data';

type ExampleSection = {
  title: string;
  description: string;
  sources: [string, string][];
};

const exampleSections: ExampleSection[] = [
  {
    title: 'Viewer examples',
    description:
      'Generated from this repository (examples/). Every scale has a small random array, so thumbnails render.',
    sources: [
      [
        'Basic example: two images in a scene, one a label image',
        `${EXAMPLES_BASE}/example1/zarr.json`
      ],
      [
        'Many images in a collection (10 images, 5 scales each)',
        `${EXAMPLES_BASE}/example2/zarr.json`
      ],
      [
        'HCS plate: plate / well / acquisition traits, wells as JSON documents',
        `${EXAMPLES_BASE}/example4/zarr.json`
      ],
      [
        'Use http paths to add the examples above into 1 collection',
        `${EXAMPLES_BASE}/example3/root.json`
      ],
      [
        'Extensions: extension manifest, URI traits and a URI node type (table with CSV path)',
        `${EXAMPLES_BASE}/example5/zarr.json`
      ],
      [
        'Pre-revision RFC-8 document (shows the legacy format error)',
        `${EXAMPLES_BASE}/invalid/legacy/root.json`
      ]
    ]
  },
  {
    title: 'ngio-collections examples',
    description:
      'Documents from the ngio-collections rfc8-revision1 branch. They carry metadata only (no arrays), so thumbnails show an error.',
    sources: [
      [
        'create_collection: scene with raw and nuclei labels, two extension manifests',
        `${NGIO_COLLECTIONS_BASE}/create_collection/zarr.json`
      ],
      ['hcs_plate: plate with wells and fields', `${NGIO_COLLECTIONS_BASE}/hcs_plate/zarr.json`],
      [
        'nested_collections: an embedded collection externalized into its own document',
        `${NGIO_COLLECTIONS_BASE}/nested_collections/zarr.json`
      ],
      [
        'extension_types: Fractal table node pointing at a CSV',
        `${NGIO_COLLECTIONS_BASE}/extension_types/zarr.json`
      ],
      [
        'trait_override: trait declared on the entry overriding the target',
        `${NGIO_COLLECTIONS_BASE}/trait_override/zarr.json`
      ],
      [
        'v05_plate_convert: plate converted from OME-Zarr 0.5',
        `${NGIO_COLLECTIONS_BASE}/v05_plate_convert/zarr.json`
      ],
      [
        'open_edit_save: collection written back after editing',
        `${NGIO_COLLECTIONS_BASE}/open_edit_save/zarr.json`
      ],
      [
        'open_resolved_inspect: collection with external multiscale entries',
        `${NGIO_COLLECTIONS_BASE}/open_resolved_inspect/zarr.json`
      ],
      [
        'remote_collection: a single node with an unreachable http path',
        `${NGIO_COLLECTIONS_BASE}/remote_collection/zarr.json`
      ]
    ]
  }
];

export function createHomepage(): HTMLDivElement {
  const container = document.createElement('div');
  container.classList.add(`${CSS_CLASS_PREFIX}homepage`);
  container.appendChild(document.createElement('h1')).textContent = 'ngff-rfc8-viewer';

  const queryParams = new URLSearchParams(window.location.search);
  const currentUrl = window.location.href;

  const form = document.createElement('form');
  container.appendChild(form);
  const input = document.createElement('input');
  input.placeholder = 'Enter source URL...';
  input.name = 'source';
  form.method = 'get';
  form.action = currentUrl.split('?')[0];
  form.appendChild(input);

  function createLink(url: string, text: string, parent: HTMLElement): HTMLAnchorElement {
    const link = document.createElement('a');
    queryParams.set('source', url);
    link.href = `${currentUrl.split('?')[0]}?${queryParams.toString()}`;
    link.textContent = text;
    parent.appendChild(link);
    const jsonLink = document.createElement('a');
    jsonLink.href = url;
    jsonLink.target = '_blank';
    jsonLink.style.marginLeft = '20px';
    jsonLink.textContent = '[view json]';
    parent.appendChild(jsonLink);
    return link;
  }

  // One titled list per example section
  for (const section of exampleSections) {
    container.appendChild(document.createElement('h2')).textContent = section.title;
    const description = document.createElement('p');
    description.classList.add(`${CSS_CLASS_PREFIX}homepage-section-description`);
    description.textContent = section.description;
    container.appendChild(description);

    const list = document.createElement('ul');
    container.appendChild(list);
    for (const [text, url] of section.sources) {
      const listItem = document.createElement('li');
      listItem.style.marginBottom = '10px';
      createLink(url, text, listItem);
      list.appendChild(listItem);
    }
  }

  return container;
}
