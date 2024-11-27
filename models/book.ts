interface Book {
  title: string;
  cover_url: string;
  contents: {
    chapters: string[];
    appendices: string[];
  };
  page_previews: string[];
  download_url: string;
  file_name: string;
}

export default Book;
