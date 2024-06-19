import {Fragment, useEffect, useState} from "react";
import {Container} from "../components/Container.tsx";
import {getMovies} from "../services/API.ts";
import {BrowsePreview} from "../components/movies/BrowsePreview.tsx";
import Movie from "../interfaces/Movie.ts";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";

const sorts = [
    {id: "title--asc", name: "Title (Ascending)"},
    {id: "title--desc", name: "Title (Descending)"},
    {id: "release_date--asc", name: "Release Date (Ascending)"},
    {id: "release_date--desc", name: "Release Date (Descending)"}];
const Movies = () => {
    const [movies, setMovies] = useState<null | Movie[]>(null);
    const [selectedSort, setSelectedSort] = useState(sorts[0]);


    useEffect(() => {
        getMovies(...selectedSort.id.split("--")).then(({movies}) => {
            setMovies(movies);
        });
    }, [selectedSort]);
    return (
        <Container>
            <div className="max-w-7xl w-full flex justify-between flex-row">
                <h1 className="text-2xl font-semibold">Movies</h1>
                <div className="top-16 w-72">
                    <Listbox value={selectedSort} onChange={setSelectedSort}>
                        <div className="relative mt-1">
                            <Listbox.Button
                                className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selectedSort.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {sorts.map((sort, sortIdx) => (
                                        <Listbox.Option
                                            key={sortIdx}
                                            className={({active}) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                                                }`
                                            }
                                            value={sort}
                                        >
                                            {({selected}) => (
                                                <>
                      <span
                          className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {sort.name}
                      </span>
                                                    {selected ? (
                                                        <span
                                                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
            <div className="flex flex-row flex-wrap max-w-7xl justify-center">
                {movies && movies.map((movie => {
                    return <BrowsePreview movie={movie}/>;
                }))}
            </div>
        </Container>
    );
};

export default Movies;
