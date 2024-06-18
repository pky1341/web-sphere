import Image from "next/image";
import React, { useState } from "react";
import search from "@/images/Icons/search.png";
import { Client as ElasticsearchClient } from "elasticsearch";
import { Modal, Input, List, ListItem } from "@mui/material";

interface SearchHit {
  _id: string;
  _source: {
    title: string;
  };
}

const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const client = new ElasticsearchClient({
    node: "http://localhost:9200",
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const response = await client.search({
      index: "tutorial",
      body: {
        query: {
          match: {
            title: event.target.value,
          },
        },
      },
    });
    setResults(
      response.hits.hits.map((hit) => ({
        _id: hit._id ?? "",
        _source: hit._source as { title: string },
      }))
    );
  };
  return (
    <div className="relative">
      <Image
        src={search}
        alt="search Icon"
        className="mr-4 cursor-pointer"
        width={24}
        height={36}
        onClick={handleOpen}
      />
      <Modal open={open} onClose={handleClose}>
        <div className="flex flex-col items-center justify-center h-screen">
          <Input
            placeholder="find a tutorial"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md mb-4"
          />
          <List className="w-full max-w-md">
            {results.map((result) => (
              <ListItem key={result._id}>{result._source.title}</ListItem>
            ))}
          </List>
        </div>
      </Modal>
    </div>
  );
};

export default Search;
