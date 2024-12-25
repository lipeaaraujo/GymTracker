import { useEffect, useState } from "react";
import { FaPlus, FaWeightHanging } from "react-icons/fa";
import { CiCalendar, CiEdit, CiTrash } from "react-icons/ci";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import { GiWeight, GiWeightLiftingUp } from "react-icons/gi";

const SESSIONS_URL = "/session";

const ViewSession = () => {
  const { id } = useParams();
  const [session, setSession] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const [errMsg, setErrMsg] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [addingSet, setAddingSet] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSessionAndSets = async () => {
      try {
        const response = await axiosPrivate.get(`${SESSIONS_URL}/${id}/sets`, {
          signal: controller.signal,
        });
        setSession(response.data);
        setErrMsg("");
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 403) {
          setErrMsg("Unauthorized");
          navigate("/login", { state: { from: location }, replace: true });
        } else {
          setErrMsg("Request failed");
        }
      }
    };

    getSessionAndSets();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    session && setFormattedDate(formatDate(session.date));
  }, [session])

  return (
    <section className="flex flex-col h-full gap-4 overflow-y-scroll">
      <header className="">
        <h2>Session Details:</h2>
        <p className={errMsg ? "error" : "hidden"}>{errMsg}</p>
      </header>
      { session && (
        <article className="w-full flex flex-col justify-center gap-2">
          <section className="w-fit flex items-center gap-1">
            <CiCalendar size={28} />
            <p><b>Date:</b> {formattedDate}</p>
          </section>
          <section className="w-fit flex items-center gap-1">
            <GiWeightLiftingUp size={28} />
            <p><b>Sets:</b> {session.numSets}</p>
          </section>
          <section className="w-fit flex items-center gap-1">
            <GiWeight size={28} />
            <p><b>Biggest Load:</b> {session?.biggestLoad}</p>
          </section>
        </article>
      )}
      { session && (
        <article className="flex flex-col items-center gap-2">
          <header className="w-full flex gap-2 justify-center">
            <FaWeightHanging size={28} />
            <h2>Sets:</h2>
          </header>
          {session.sets.map((set) => (
            <button>teste</button>
          ))}
          <section className="bg-zinc-700 w-full rounded-xl p-1 flex gap-2 items-center">
            <p><b>Repetitions:</b> {}</p>
            <p className="mr-auto"><b>Weight:</b> {}</p>
            <button className="p-1 self-end">
              <CiEdit size={28}/>
            </button>
            <button className="p-1 hover:bg-red-600">
              <CiTrash size={28}/>
            </button>
          </section>
          {addingSet && (
            <form className="bg-zinc-700 w-full rounded-xl p-2">
              {/* working */}
            </form>
          )}
          <button
            onClick={() => setAddingSet(true)}
            className="bg-neutral-900 w-full rounded-xl hover:bg-zinc-600 flex justify-center"
          >
            <FaPlus size={20} />
          </button>
        </article>
      )}
    </section>
  );
};

export default ViewSession;
