import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import { FiDownload, FiEye, FiBook, FiFileText, FiVideo, FiArchive } from "react-icons/fi";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [selectedType, setSelectedType] = useState("all");

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      let url = `/material?semester=${selectedSemester}`;
      if (selectedType !== "all") {
        url += `&type=${selectedType}`;
      }
      
      const response = await axiosWrapper.get(url);
      if (response.data?.success) {
        const items = response.data?.data;
        setMaterials(Array.isArray(items) ? items : []);
      } else {
        toast.error(response.data?.message || "Failed to fetch materials");
        setMaterials([]);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
      if (error?.response?.status === 404) {
        setMaterials([]);
      } else {
        toast.error(error?.response?.data?.message || "Failed to fetch materials");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [selectedSemester, selectedType]);

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const getTypeIcon = (type) => {
    const icons = {
      notes: <FiBook className="w-5 h-5" />,
      assignment: <FiFileText className="w-5 h-5" />,
      syllabus: <FiArchive className="w-5 h-5" />,
      other: <FiFileText className="w-5 h-5" />,
    };
    return icons[type] || <FiFileText className="w-5 h-5" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      notes: "bg-blue-100 text-blue-800",
      assignment: "bg-green-100 text-green-800",
      syllabus: "bg-purple-100 text-purple-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = (material) => {
    const link = document.createElement('a');
    link.href = `${process.env.REACT_APP_MEDIA_LINK}/${material.file}`;
    link.download = material.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (material) => {
    window.open(`${process.env.REACT_APP_MEDIA_LINK}/${material.file}`, '_blank');
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <Heading title="Coordinator - Study Materials" />
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                As a coordinator, you can view and manage study materials for your branch. You can download, view, and organize materials by semester and type.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Semester Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Semester:</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <button
                key={semester}
                onClick={() => handleSemesterChange(semester.toString())}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedSemester === semester.toString()
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Semester {semester}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Type:</h3>
          <div className="flex flex-wrap gap-2">
            {['all', 'notes', 'assignment', 'syllabus', 'other'].map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 rounded-md font-medium transition-colors capitalize ${
                  selectedType === type
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div key={material._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-green-600">
                      {getTypeIcon(material.type)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(material.type)}`}>
                      {material.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Sem {material.semester}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {material.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {material.description || 'No description available'}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subject:</span>
                    <span className="text-gray-900 font-medium">{material.subject?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Uploaded:</span>
                    <span className="text-gray-900">{formatDate(material.createdAt)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Uploaded by:</span>
                    <span className="text-gray-900">{material.uploadedBy || 'Faculty'}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(material)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <FiEye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(material)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <FiDownload className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData message={`No materials found for semester ${selectedSemester}${selectedType !== 'all' ? ` and type ${selectedType}` : ''}`} />
      )}

      {/* Statistics */}
      {materials.length > 0 && (
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Materials Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{materials.length}</div>
              <div className="text-sm text-green-700">Total Materials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {materials.filter(m => m.type === 'notes').length}
              </div>
              <div className="text-sm text-blue-700">Notes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {materials.filter(m => m.type === 'assignment').length}
              </div>
              <div className="text-sm text-purple-700">Assignments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {materials.filter(m => m.type === 'syllabus').length}
              </div>
              <div className="text-sm text-red-700">Syllabus</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Material;