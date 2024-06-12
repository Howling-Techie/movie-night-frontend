import {Fragment, useEffect, useState} from "react";
import {Container} from "../components/Container.tsx";
import {getSubmissions, getSubmissionStatuses, getSubmissionUsers} from "../services/API.ts";
import BrowsePreview from "../components/submissions/BrowsePreview.tsx";
import Submission from "../interfaces/Submission.ts";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";

const sorts = [
    {id: "title--asc", name: "Title (Ascending)"},
    {id: "title--desc", name: "Title (Descending)"},
    {id: "time_submitted--asc", name: "Time Submitted (Ascending)"},
    {id: "time_submitted--desc", name: "Time Submitted (Descending)"}];
const Submissions = () => {
    const [submissions, setSubmissions] = useState<null | Submission[]>(null);
    const [selectedSort, setSelectedSort] = useState(sorts[0]);
    const [availableStatuses, setAvailableStatuses] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [availableUsers, setAvailableUsers] = useState<{ user_id: string, username: string }[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<{ user_id: string, username: string }[]>([]);

    useEffect(() => {
        const getSubmissionData = async () => {
            //const sortArray = selectedSort.id.split("--");
            // const {submissions} = await getSubmissions(sortArray[0], sortArray[1],
            //     selectedStatuses && selectedStatuses.length > 0 ? selectedStatuses : null,
            //     selectedUsers && selectedUsers.length > 0 ? selectedUsers.map(user => user.user_id) : null);
            const {submissions} = await getSubmissions();
            setSubmissions(submissions);
        };
        getSubmissionData();
    }, [selectedSort, selectedStatuses, selectedUsers]);

    useEffect(() => {
        const getFilters = async () => {
            // const {statuses} = await getSubmissionStatuses();
            // const {users} = await getSubmissionUsers();
            // setAvailableStatuses(statuses);
            // setAvailableUsers(users);
        };
        getFilters();
    }, [submissions]);

    return (
        <Container>
            <div className="max-w-7xl w-full flex justify-between flex-col items-center md:items-start md:flex-row">
                <div className="flex-grow flex-row flex"><h1
                    className="text-2xl font-semibold">Submissions</h1> <a
                    href="submissions/new"
                    className="rounded-md text-white bg-blue-400 hover:bg-blue-500 px-4 py-2 text-center mx-2 font-semibold">SUBMIT</a>
                </div>
                <div className="top-16 w-72">
                    <Listbox value={selectedStatuses} onChange={setSelectedStatuses} multiple>
                        <div className="relative mt-1">
                            <Listbox.Button
                                className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span
                                    className="block truncate">{selectedStatuses.length > 0 ? selectedStatuses.join(", ") : "Filter status"}</span>
                                <span
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                                    {availableStatuses.map((status, statusIdx) => (
                                        <Listbox.Option
                                            key={statusIdx}
                                            className={({active}) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                                                }`
                                            }
                                            value={status}
                                        >
                                            {({selected}) => (
                                                <>
                      <span
                          className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {status}
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
                <div className="top-16 w-72">
                    <Listbox value={selectedUsers} onChange={setSelectedUsers} multiple>
                        <div className="relative mt-1">
                            <Listbox.Button
                                className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span
                                    className="block truncate">{selectedUsers.length > 0 ? selectedUsers.map(user => user.username).join(", ") : "Filter users"}</span>
                                <span
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                                    {availableUsers.map((user, userIdx) => (
                                        <Listbox.Option
                                            key={userIdx}
                                            className={({active}) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                                                }`
                                            }
                                            value={user}
                                        >
                                            {({selected}) => (
                                                <>
                      <span
                          className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {user.username}
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
                <div className="top-16 w-72">
                    <Listbox value={selectedSort} onChange={setSelectedSort}>
                        <div className="relative mt-1">
                            <Listbox.Button
                                className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selectedSort.name}</span>
                                <span
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
            <div className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 gap-2">
                {submissions && submissions.map((submission => {
                    return <BrowsePreview key={submission.id} submission={submission}/>;
                }))}
            </div>
        </Container>
    );
};

export default Submissions;
