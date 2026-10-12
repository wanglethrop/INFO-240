const databases = {
  Italy: [
    {
      name: "Portale Antenati",
      description: "Italian state-archive civil-registration and military records.",
      url: "https://antenati.cultura.gov.it/",
      terms: "testamento OR testamenti OR successione OR atti notarili"
    },
    {
      name: "Sistema Archivistico Nazionale",
      description: "Italian national portal for archival descriptions.",
      url: "https://san.beniculturali.it/web/san/home",
      terms: "testamento OR testamenti OR atti notarili"
    },
    {
      name: "SIUSA",
      description: "Descriptions of public and private Italian archival holdings.",
      url: "https://siusa.archivi.beniculturali.it/",
      terms: "testamento OR testamenti OR notai"
    },
    {
      name: "Internet Culturale",
      description: "Italian libraries, manuscripts, and digitized cultural material.",
      url: "https://www.internetculturale.it/",
      terms: "testamento OR testamenti OR manoscritto"
    },
    {
      name: "FamilySearch — Italy",
      description: "Italian indexed and browse-only family-history collections.",
      url: "https://www.familysearch.org/en/search/collection/location/1927178",
      terms: "testamento OR successione"
    }
  ],

  Germany: [
    {
      name: "Archivportal-D",
      description: "German archives portal and digitized archival records.",
      url: "https://www.archivportal-d.de/",
      terms: "Testament OR Nachlass OR Erbschaft OR Notariat"
    },
    {
      name: "Deutsche Digitale Bibliothek",
      description: "German libraries, archives, museums, and digital collections.",
      url: "https://www.deutsche-digitale-bibliothek.de/",
      terms: "Testament OR Nachlass"
    },
    {
      name: "Bundesarchiv Invenio",
      description: "German Federal Archives catalogue.",
      url: "https://invenio.bundesarchiv.de/",
      terms: "Testament OR Nachlass OR Erbschaft"
    },
    {
      name: "Kalliope",
      description: "Catalogue of personal papers, manuscripts, and autographs.",
      url: "https://kalliope-verbund.info/",
      terms: "Testament OR Nachlass"
    }
  ],

  France: [
    {
      name: "FranceArchives",
      description: "National French portal for archival descriptions.",
      url: "https://francearchives.gouv.fr/",
      terms: "testament OR succession OR notaire"
    },
    {
      name: "Archives nationales",
      description: "French National Archives catalogue and resources.",
      url: "https://www.archives-nationales.culture.gouv.fr/",
      terms: "testament OR succession OR notaire"
    },
    {
      name: "Gallica",
      description: "Digitized French books, manuscripts, newspapers, and images.",
      url: "https://gallica.bnf.fr/",
      terms: "testament OR succession OR inventaire"
    },
    {
      name: "Geneanet",
      description: "Genealogical indexes and contributed archival material.",
      url: "https://www.geneanet.org/",
      terms: "testament OR succession"
    }
  ],

  Spain: [
    {
      name: "PARES",
      description: "Spanish state archives portal.",
      url: "https://pares.cultura.gob.es/",
      terms: "testamento OR testamentaría OR protocolo notarial"
    },
    {
      name: "Hispana",
      description: "Spanish digital cultural-collections portal.",
      url: "https://hispana.mcu.es/",
      terms: "testamento OR testamentaría OR sucesión"
    },
    {
      name: "Biblioteca Digital Hispánica",
      description: "Digitized Spanish books, manuscripts, and historical collections.",
      url: "https://www.bne.es/es/catalogos/biblioteca-digital-hispanica",
      terms: "testamento OR testamentaría"
    },
    {
      name: "Archivo Histórico Nacional",
      description: "Spanish National Historical Archive.",
      url: "https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/ahn/portada.html",
      terms: "testamento OR protocolo OR sucesión"
    }
  ],

  "United Kingdom": [
    {
      name: "GOV.UK Probate Search",
      description: "Probate records for England and Wales.",
      url: "https://www.gov.uk/search-will-probate",
      direct: true
    },
    {
      name: "The National Archives Discovery",
      description: "UK national and local archive catalogue.",
      url: "https://discovery.nationalarchives.gov.uk/",
      terms: "will OR probate OR testament OR administration"
    },
    {
      name: "Archives Hub",
      description: "University and specialist archival collections in the UK.",
      url: "https://archiveshub.jisc.ac.uk/",
      terms: "will OR probate OR testament"
    },
    {
      name: "ScotlandsPeople",
      description: "Scottish wills, testaments, and genealogical records.",
      url: "https://www.scotlandspeople.gov.uk/",
      terms: "will OR testament OR probate"
    }
  ],

  "United States": [
    {
      name: "National Archives Catalog",
      description: "United States federal archival catalogue.",
      url: "https://catalog.archives.gov/",
      terms: "will OR probate OR testament OR estate"
    },
    {
      name: "FamilySearch",
      description: "International genealogical records and images.",
      url: "https://www.familysearch.org/search/",
      terms: "will OR probate OR testament"
    },
    {
      name: "Internet Archive",
      description: "Digitized will books, local histories, indexes, and archive guides.",
      url: "https://archive.org/",
      terms: "will OR probate OR testament"
    }
  ],

  Europe: [
    {
      name: "Archives Portal Europe",
      description: "Descriptions of archival material held across Europe.",
      url: "https://www.archivesportaleurope.net/",
      terms: "will OR testament OR probate"
    },
    {
      name: "Europeana",
      description: "European digitized books, manuscripts, images, and archival material.",
      url: "https://www.europeana.eu/",
      terms: "will OR testament OR probate"
    },
    {
      name: "Google Books",
      description: "Printed editions, abstracts, local histories, and archive guides.",
      url: "https://books.google.com/",
      terms: "will OR testament OR probate"
    }
  ]
};

const form = document.querySelector("#searchForm");
const results = document.querySelector("#results");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = document.querySelector("#query").value.trim();
  const selectedCountry = document.querySelector("#country").value;

  const likelyCountry =
    selectedCountry === "Auto"
      ? detectLikelyCountry(query)
      : selectedCountry;

  const orderedCountries = [
    likelyCountry,
    ...Object.keys(databases).filter(
      (country) => country !== likelyCountry && country !== "Europe"
    ),
    "Europe"
  ];

  results.innerHTML = `
    <h2>Searches for “${escapeHtml(query)}”</h2>

    <p class="notice">
      <strong>${escapeHtml(likelyCountry)}</strong> databases are shown first.
      This is a search heuristic, not a statement of nationality or archival location.
    </p>

    ${orderedCountries.map((country, index) => `
      <section class="country-group">
        <h3>${index === 0 ? "Likely first: " : ""}${escapeHtml(country)}</h3>

        ${databases[country].map((database) => `
          <article>
            <span class="tag">${escapeHtml(country)}</span>
            <h4>${escapeHtml(database.name)}</h4>
            <p>${escapeHtml(database.description)}</p>
            <a
              href="${makeSearchLink(database, query)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Search this database ↗
            </a>
          </article>
        `).join("")}
      </section>
    `).join("")}
  `;
});

function makeSearchLink(database, query) {
  if (database.direct) {
    return database.url;
  }

  const domain = new URL(database.url).hostname.replace("www.", "");
  const terms = `${query} ${database.terms}`;

  return `https://www.google.com/search?q=${encodeURIComponent(
    `site:${domain} ${terms}`
  )}`;
}

function detectLikelyCountry(query) {
  const normalized = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (
    /\b(italy|italia|rome|roma|venice|venezia|florence|firenze|milan|milano|naples|napoli|tuscany|toscana|sicily|sicilia)\b/.test(normalized) ||
    /(ini|ino|etti|ucci|uzzi|ello|ella|aldi|ardi|esco|eschi)$/.test(normalized)
  ) {
    return "Italy";
  }

  if (
    /\b(germany|deutschland|berlin|bavaria|bayern|hamburg|sachsen|munich|munchen)\b/.test(normalized) ||
    /(mann|berg|burg|stein|schmidt|meyer|muller|feld|hardt)$/.test(normalized)
  ) {
    return "Germany";
  }

  if (
    /\b(france|paris|lyon|normandy|normandie|brittany|bretagne|provence|alsace)\b/.test(normalized) ||
    /(eau|eaux|ier|iere|ette|ois|ard|mont|ville)$/.test(normalized)
  ) {
    return "France";
  }

  if (
    /\b(spain|espana|madrid|sevilla|seville|barcelona|aragon|castilla|valencia)\b/.test(normalized) ||
    /(ez|es|ero|era|ado|ada|illa|illas)$/.test(normalized)
  ) {
    return "Spain";
  }

  if (
    /\b(england|wales|scotland|london|yorkshire|kent|cornwall|edinburgh)\b/.test(normalized) ||
    /(son|smith|jones|brown|wright|wood|ford)$/.test(normalized)
  ) {
    return "United Kingdom";
  }

  return "Italy";
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}
