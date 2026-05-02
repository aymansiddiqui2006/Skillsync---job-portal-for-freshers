import React, { useEffect, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import UserContext from "../../context/UserContext";
import api from "../../../utils/apiInstance";
import { APIpaths } from "../../../utils/apiPath";

import Model from "../../Model.jsx";
import Input from "../../elements/Inputs/Input.jsx";

const initialForm = {
    companyName: "",
    title: "",
    description: "",
    jobType: "",
    workMode: "",
    experienceLevel: "",
    requirement: "",
};

const jobTypes = ["internship", "full-time", "part-time"];
const workModes = ["remote", "onsite", "hybrid"];
const experienceLevels = ["fresher", "entry-level", "experienced"];

function MyJobs() {
    const { user, jobs, setJobs } = useContext(UserContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialForm);

    const [logoFile, setLogoFile] = useState(null);
    const [dataFile, setDataFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);

    // ================= FETCH JOBS =================

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get(
                    APIpaths.JOB.GET_JOB_BY_RECRUITER(user?._id),
                    { withCredentials: true }
                );

                setJobs(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (user?._id) fetchJobs();
    }, [user?._id, setJobs]);

    // ================= HANDLE CHANGE =================

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // ================= RESET FORM =================

    const resetForm = () => {
        setFormData(initialForm);
        setLogoFile(null);
        setDataFile(null);
        setSelectedJob(null);
        setError("");
    };

    // ================= OPEN EDIT =================

    const openEditModal = (job) => {
        setSelectedJob(job);

        setFormData({
            companyName: job.companyName,
            title: job.title,
            description: job.description,
            jobType: job.jobType,
            workMode: job.workMode,
            experienceLevel: job.experienceLevel,
            requirement: job.requirement?.join(", ") || "",
        });

        setIsModalOpen(true);
    };

    // ================= SUBMIT =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const {
                companyName,
                title,
                description,
                jobType,
                workMode,
                experienceLevel,
                requirement,
            } = formData;

            if (
                !companyName ||
                !title ||
                !description ||
                !jobType ||
                !workMode ||
                !experienceLevel
            ) {
                return setError("All fields are required");
            }

            const payload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "requirement") {
                    payload.append(key, value);
                }
            });

            const reqArray = requirement
                .split(",")
                .map((r) => r.trim())
                .filter(Boolean);

            reqArray.forEach((r) => {
                payload.append("requirement", r);
            });

            if (logoFile) payload.append("logo", logoFile);

            if (dataFile) payload.append("DataFile", dataFile);

            let res;

            if (selectedJob) {
                res = await api.patch(
                    APIpaths.JOB.UPDATE_JOB(selectedJob._id),
                    payload,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                setJobs((prev) =>
                    prev.map((j) =>
                        j._id === selectedJob._id ? res.data.data : j
                    )
                );

                toast.success("Job updated");
            } else {
                res = await api.post(APIpaths.JOB.POST_JOB, payload, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                setJobs((prev) => [res.data.data, ...prev]);

                toast.success("Job posted");
            }

            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);

            setError(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // ================= TOGGLE JOB =================

    const toggleJobStatus = async (e, job) => {
        e.stopPropagation();

        try {
            const res = await api.patch(
                APIpaths.JOB.DELETE_JOB(job._id),
                {},
                {
                    withCredentials: true,
                }
            );

            setJobs((prev) =>
                prev.map((j) =>
                    j._id === job._id ? res.data.data : j
                )
            );

            toast.success(
                res.data.data.isActive
                    ? "Job activated!"
                    : "Job closed!"
            );
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to update job"
            );
        }
    };

    return (
        <div className="flex flex-col w-full p-6">

            {/* TOPBAR */}

            <div className="flex justify-end">
                <button
                    className="bg-blue-900 text-white px-5 py-2 rounded-lg"
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                >
                    Post Job
                </button>
            </div>

            {/* JOBS */}

            <div className="grid grid-cols-5 gap-6 mt-10">
                {!jobs?.length ? (
                    <div>No job posted yet!</div>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job._id}
                            onClick={() =>
                                navigate(`/recruiter/jobs/${job._id}`)
                            }
                            className="border border-gray-400 rounded-xl overflow-hidden shadow hover:scale-105 duration-300 cursor-pointer"
                        >
                            <div className="relative h-40 bg-gray-100">
                                <img
                                    src={job.logo}
                                    alt={job.companyName}
                                    className="w-full h-full object-cover"
                                />

                                {/* EDIT */}

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditModal(job);
                                    }}
                                    className="absolute top-2 right-2 bg-white p-2 rounded-full"
                                >
                                    <FaRegEdit />
                                </button>

                                {/* STATUS */}

                                <button
                                    onClick={(e) =>
                                        toggleJobStatus(e, job)
                                    }
                                    className={`absolute bottom-2 right-2 text-xs px-3 py-1 rounded-full border
                                    ${
                                        job.isActive
                                            ? "bg-green-200 text-green-800 border-green-500"
                                            : "bg-gray-200 text-gray-700 border-gray-400"
                                    }`}
                                >
                                    {job.isActive ? "active" : "closed"}
                                </button>
                            </div>

                            <div className="p-3">
                                <h2 className="font-semibold">
                                    {job.title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {job.companyName}
                                </p>

                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL */}

            <Model
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title={selectedJob ? "Edit Job" : "Post Job"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setLogoFile(e.target.files[0])
                        }
                    />

                    <Input
                        label="Company Name"
                        type="text"
                        value={formData.companyName}
                        onChange={(value) =>
                            handleChange("companyName", value)
                        }
                    />

                    <Input
                        label="Title"
                        type="text"
                        value={formData.title}
                        onChange={(value) =>
                            handleChange("title", value)
                        }
                    />

                    <Input
                        label="Description"
                        type="textarea"
                        value={formData.description}
                        onChange={(value) =>
                            handleChange("description", value)
                        }
                    />

                    <Input
                        label="Requirements"
                        type="textarea"
                        value={formData.requirement}
                        onChange={(value) =>
                            handleChange("requirement", value)
                        }
                    />

                    {/* RADIO GROUPS */}

                    <RadioGroup
                        title="Job Type"
                        name="jobType"
                        value={formData.jobType}
                        options={jobTypes}
                        onChange={(value) =>
                            handleChange("jobType", value)
                        }
                    />

                    <RadioGroup
                        title="Work Mode"
                        name="workMode"
                        value={formData.workMode}
                        options={workModes}
                        onChange={(value) =>
                            handleChange("workMode", value)
                        }
                    />

                    <RadioGroup
                        title="Experience Level"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        options={experienceLevels}
                        onChange={(value) =>
                            handleChange(
                                "experienceLevel",
                                value
                            )
                        }
                    />

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                            setDataFile(e.target.files[0])
                        }
                    />

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-800 text-white px-5 py-2 rounded-xl"
                        >
                            {loading
                                ? "Saving..."
                                : selectedJob
                                ? "Update"
                                : "Post"}
                        </button>
                    </div>
                </form>
            </Model>
        </div>
    );
}

export default MyJobs;


function RadioGroup({
    title,
    options,
    value,
    onChange,
    name,
}) {
    return (
        <div>
            <h2 className="text-lg mb-2">{title}</h2>

            <div className="flex gap-4">
                {options.map((option) => (
                    <label
                        key={option}
                        className="flex items-center gap-1 capitalize"
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={(e) =>
                                onChange(e.target.value)
                            }
                        />

                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
}