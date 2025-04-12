import React, { useEffect, useState } from "react";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPart: string | null;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({
  isOpen,
  onClose,
  selectedPart,
  selectedItems,
  setSelectedItems,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      console.log(selectedPart);
    };
  }, [isOpen]);

  const scalp = [
    "baby's soft spot is bulging",
    "baby's soft spot is sunken",
    "bald spots (hair)",
    "complete loss of hair over entire body",
    "completely bald",
    "dandruff",
    "deformed forehead",
    "dry scalp",
    "early grey hair",
    "forehead sticks out",
    "hair dryness",
    "hair sparse",
    "head lice",
    "headache",
    "itchy scalp",
    "losing hair",
    "lump on scalp",
    "male pattern baldness",
    "pulling out hair",
    "rash limited to scalp",
    "readness and dry scaly skin",
    "scalp tender to touch",
    "widespread loss of hair",
  ];

  const forehead = [
    "can't pay attention",
    "confused thinking and reduced awareness of your environment",
    "enlarged vein on forehead",
    "fatigue",
    "fever",
    "forehead is tender",
    "forehead sticks out",
    "hairy forehead",
    "hallucination",
    "headache",
    "headache in front of head",
    "high forehead",
    "inappropriate behavior",
    "lightheadedness",
    "paranoia",
    "wide forehead",
    "wrinkled forehead",
  ];
  const eyes = [
    "black eye",
    "blind spot",
    "blurry vision",
    "blurry vision in one eye",
    "bruising around eyes",
    "can't look up",
    "central vision loss",
    "decreased vision",
    "distorted vision",
    "double vision",
    "dry eyes",
    "eye discharge",
    "eye hurts",
    "eye pain",
    "eye socket hurts",
    "eye strain",
    "eye twitching",
    "eyelid hurts",
    "eyes are irritated",
    "flashing lights in vision",
    "flickering uncolored zig-zag lines in vision",
    "inner corner of eye is swollen",
    "irritated eye",
    "itchy eye",
    "itchy eyelid",
    "lateral vision loss",
    "lazy eye",
    "light hurts eyes",
    "loss of vision in one eye",
    "no peripheral vision",
    "nystagmus",
    "one eye sees better than the other",
    "one eyelid swollen",
    "pain around the eye",
    "painful and weak eye movement",
    "peripheral vision loss",
    "pink eye",
    "poor night vision",
    "pus coming from the eye",
    "rash limited to eyelid",
    "red eye",
    "seeing halos of light around things",
    "severe eye pain",
    "single red eye",
    "skin and eyes more sensitive to sunlight",
    "small dot of light or zigzag shape in your vision",
    "sore eye",
    "stye",
    "swollen eyelid",
    "tearing in one eye",
    "temporary vision loss",
    "vision loss",
    "visual aura",
    "watery eyes",
    "wrinkle between eyebrows",
    "yellow eyes",
  ];
  const nose = [
    "blockage in nose",
    "bloody nose",
    "dry nasal passages",
    "hay fever",
    "head congestion",
    "itchy nose",
    "nasal sinus draining",
    "nasal sinus feels full",
    "nasal sinus pain",
    "nasal sinus sore",
    "nose discharge, foul smelling, unilateral",
    "nose discharge, purulent, unilateral",
    "nosebleed",
    "postnasal drip",
    "pus coming out of nose",
    "runny nose",
    "sinusitis",
    "smelly, runny nose",
    "sneezing",
    "snotty, runny nose",
    "stuffy nose",
    "trouble smelling",
    "using decongestant nose drops",
  ];
  const face = [
    "can't move one side of my face",
    "cheek bone pain",
    "cheek pain",
    "face feels numb",
    "face feels weak",
    "face hurts",
    "face is swollen",
    "face sweats a lot",
    "face turns reddish color",
    "half of face is flushed",
    "horner syndrome",
    "loss of facial hair",
    "nasal sinus pain",
    "numbness of face",
    "one side of face feels weak",
    "one side of face not the same as the other",
    "rash limited to face",
    "red face",
    "red flaky rash limited to smile or laugh lines",
    "red, swollen, runny nose",
    "rough hair on face",
    "thinning facial hair",
    "tingling or pricking face skin",
    "tingling or pricking on one side of face",
    "tingling or pricking skin of face",
    "trigeminal neuralgia",
    "trigeminal paralysis",
    "weak muscles in face",
  ];
  const ears = [
    "blocked ear",
    "can't hear on one side",
    "constant ear ringing",
    "dry skin in ear",
    "ear bleeding",
    "ear infection",
    "ear is red",
    "ear tender to touch",
    "ear wax blocking ear",
    "earache",
    "ears feel full",
    "ears set low",
    "fluid leaking from my ear",
    "headache behind ears",
    "hearing is getting worse",
    "itchy ear",
    "outside of ear hurts",
    "pus coming from my ear",
    "rash limited to ear",
    "swollen ear cartilage",
    "trouble hearing",
  ];
  const mouth = [
    "bad breath",
    "bleeding gums",
    "breath has a fruity smell",
    "breath smells like almonds",
    "bulimia",
    "cold sore",
    "cough",
    "crack at the corner of mouth",
    "crack on tongue",
    "dehydration",
    "dental caries",
    "denture pain",
    "drooling",
    "dry mouth",
    "gingival erythema",
    "gingival tenderness",
    "gingival ulceration",
    "gingivitis",
    "gums hurt",
    "hives on lips",
    "hot food or liquids hurt tooth",
    "large tongue",
    "lip hurts",
    "lips turning blue",
    "lower lip droops",
    "malocclusion",
    "metal taste in mouth",
    "more thirsty than usual",
    "mouth bleeding",
    "mouth hurts",
    "mouth is swollen",
    "mouth mucous membrane bleeding",
    "open sore(s) in mouth",
    "open sore(s) on lip",
    "self induced vomiting",
    "severely bad breath",
    "snoring",
    "swelling around the mouth",
    "swollen gums",
    "swollen lips",
    "swollen throat",
    "swollen tonsils",
    "throat is dry",
    "thrush",
    "tonsil inflammation",
    "tooth cold sensitivity",
    "tooth discoloration",
    "tooth erosion",
    "tooth impaction",
    "tooth loose",
    "toothache",
    "upper lip is swollen",
    "vomiting blood",
  ];
  const jaw = [
    "cheek and jaw swollen",
    "clicking or popping sound from jaw",
    "jaw angle tenderness",
    "jaw hurts",
    "lower jaw hurts",
    "lymph node under jaw enlarged",
    "pain in jaw when chewing",
    "upper jaw hurts",
  ];
  const neck = [
    "choking",
    "choking sensation",
    "cough",
    "epiglottis swelling",
    "episodes of not breathing during sleep",
    "food comes back up",
    "food or liquid goes down wrong pipe",
    "high pitched breathing",
    "itchy throat",
    "jugular vein a wave increased",
    "laryngeal pain",
    "laryngitis",
    "lump on neck",
    "lump on one side of neck",
    "neck bones fused together",
    "neck bones sticking out",
    "neck hurts",
    "neck is swollen",
    "neck tender to touch",
    "pain on one side of throat",
    "pain when i swallow",
    "painful swollen gland in front part of neck",
    "rash limited to neck",
    "sore throat",
    "stiff neck",
    "tender neck lymph node",
    "throat burning sensation",
    "throat clearing",
    "throat dryness",
    "thyroid enlargement",
    "thyroid nodule",
    "tightness in throat",
    "trouble swallowing",
    "voice is hoarse",
    "white stuff on throat",
  ];
  const upper_chest = [
    "fatty area above collar bone",
    "left supraclavicular lymph node enlargement",
    "supraclavicular fossa bruit",
    "supraclavicular lymph node enlargement",
    "supraclavicular pulsation",
  ];
  const breast = [
    "abnormal growth of male breasts",
    "bloody nipple discharge",
    "breast getting bigger",
    "breast hurts",
    "breast redness",
    "breast skin feels like an orange peel",
    "breasts not developing",
    "fluid leaking from nipple",
    "growth on nipple",
    "hard lump in breast",
    "infected lump or sore on breast",
    "lump in breast",
    "nipple pulling to one side",
    "nipple redness",
    "nipple tender to touch",
    "part of breast skin appears pulled inward",
    "rash limited to under the breast",
    "red, irritated nipple",
    "swollen breast",
  ];
  const sternum = [
    "breastbone tender to touch",
    "chest bones cave in",
    "chest bones stick out",
    "congestive heart failure",
    "feeling of pressure in food pipe",
    "food gets stuck",
    "hard for food to go down",
    "heartburn",
    "hiccups",
    "inflammation of esophagus",
    "palpitations",
    "pressure on heart due to fluid buildup",
    "severe chest pain/pressure",
    "sternal lift",
    "sternal pulsation visible",
    "tightening of esophagus",
  ];
  const chest = [
    "abnormal growth of male breasts",
    "barky cough",
    "blood clot traveled to lung",
    "bloody nipple discharge",
    "breast getting bigger",
    "breast hurts",
    "breast redness",
    "breast skin feels like an orange peel",
    "breastbone tender to touch",
    "breasts not developing",
    "breathing too fast",
    "buildup of fluid in lungs",
    "can't cough up mucus or phlegm",
    "chest bones cave in",
    "chest bones stick out",
    "chest hair loss",
    "chest infection",
    "chest pain",
    "chest pain made worse by breathing",
    "chest pain made worse by exertion/exercise",
    "chest tightness",
    "chronic cough (more than 8 weeks) with normal chest xray",
    "congestive heart failure",
    "cough",
    "cough out mucus",
    "cough up thick gunk",
    "cough up yellow gunk",
    "cough with mucus long time",
    "coughing at night",
    "coughing attacks",
    "coughing up bad smelling mucus",
    "coughing up blood",
    "crushing chest pain",
    "dry cough",
    "emphysema",
    "fatty area above collar bone",
    "feeling of pressure in food pipe",
    "fluid leaking from nipple",
    "food gets stuck",
    "forceful cough",
    "growth on nipple",
    "hacking cough",
    "hard for food to go down",
    "hard lump in breast",
    "heartburn",
    "hiccups",
    "infected lump or sore on breast",
    "inflammation of esophagus",
    "lump in breast",
    "lung disease",
    "lung infection",
    "making a whooping noise when inhaling",
    "muscle cramp on trunk",
    "nipple pulling to one side",
    "nipple redness",
    "nipple tender to touch",
    "obese upper body",
    "pain in upper body",
    "palpitations",
    "part of breast skin appears pulled inward",
    "pneumonia",
    "pressure on heart due to fluid buildup",
    "rapid breathing",
    "rash limited to chest",
    "rash limited to under the breast",
    "red, irritated nipple",
    "severe chest pain/pressure",
    "sharp chest pain",
    "shortness breath leaning forward",
    "shortness of breath",
    "shortness of breath when lying flat",
    "shortness of breath with activity",
    "sternal lift",
    "sternal pulsation visible",
    "supraclavicular fossa bruit",
    "supraclavicular lymph node enlargement",
    "swollen breast",
    "tightening of esophagus",
    "tingling or prickling in upper body",
    "upper body muscles shrinking",
    "vomiting after cough",
    "wet cough",
  ];
  const epigastric = [
    "burping",
    "epigastric abdominal tenderness",
    "heartburn",
    "indigestion",
    "nausea",
    "pain around belly button",
    "pain in middle of belly",
    "pain near belly button spreading to lower right side of stomach",
    "reflux",
    "stomach inflammation",
    "stomach pushes through diaphragm",
    "vomiting blood",
  ];
  const upper_abdomen = [
    "burping",
    "can't digest fatty foods",
    "diarrhea after meals",
    "gallbladder inflammation",
    "gallstones",
    "inflammation of stomach and intestines",
    "liver disease",
    "nausea",
    "pancreas inflammation",
    "reflux",
    "scarring of the liver",
    "stomach pain upper left side",
    "stomach pain upper right side",
    "ulcer in muscle connecting stomach to duodenum",
    "upper belly bloating",
    "upper stomach pain",
  ];
  const lower_abdomen = [
    "bladder distention",
    "bladder feels full",
    "diarrhea",
    "feels like need to pee all the time",
    "gassy",
    "inflammation of stomach and intestines",
    "lower belly bloating",
    "lower stomach pain",
    "stomach pain lower left side",
    "stomach pain lower right side",
  ];
  const suprapubic = [
    "pubic area swollen",
    "pubic hair early onset",
    "pubic hair lice",
    "thinning pubic hair",
  ];
  const pelvic = [
    "a lot of blood in urine",
    "balls turning blue",
    "bend at hip",
    "bladder distention",
    "bladder feels full",
    "bladder infection",
    "blood in urine",
    "bloody pee",
    "bloody sperm",
    "can't have orgasm",
    "can't pee",
    "cloudy pee",
    "decreased sex drive",
    "delayed or late period",
    "discharge from penis",
    "enlarged prostate",
    "epididymal mass",
    "epididymal tenderness",
    "erection that won't go down or soften",
    "firm pus filled rash around head of penis",
    "foreskin stuck over head of penis",
    "genital pain",
    "genitals itching",
    "genitals swollen",
    "greater tuberosity tenderness",
    "groin pain",
    "groin tenderness",
    "hard bump(s) around head of penis",
    "hard bump(s) on head of penis",
    "head of penis curves downward",
    "head of penis hurts",
    "head of penis is irritated",
    "head of penis is red and swollen",
    "hip deformity",
    "hip feels like it pops out of socket",
    "hip feels stiff",
    "hip hurts",
    "hip is swollen",
    "hip muscle is weak",
    "hip tenderness",
    "hurts to ejaculate or cum",
    "immediate urge to pee",
    "impotence",
    "incontinence",
    "inflamed scrotum",
    "inguinal hernia",
    "inguinal lymph node abscess",
    "inguinal lymph node enlargement",
    "inguinal lymph node tenderness",
    "irritation between butt and genitals",
    "itching in pubic hair area",
    "itching on urethra",
    "large blister(s) on penis",
    "lump in genital area",
    "lump in groin",
    "lump on penis",
    "lump on scrotum",
    "lump on testicle",
    "man ejaculates sooner during sexual intercourse than he or his partner would like",
    "need to pee often",
    "open sore(s) around head of penis",
    "open sore(s) on head of penis",
    "open sore(s) on penis",
    "open sore(s) on urethra",
    "pain in testicle",
    "pain in testicle or ovary",
    "pain in tube behind testicle",
    "pain while peeing",
    "painful erection",
    "painful gland in groin",
    "painless ulcer on the genitals",
    "passing small kidney stones",
    "pee more than usual",
    "pelvic inflammatory disease",
    "penis hurts",
    "penis is red",
    "penis is red and irritated",
    "prostate pain",
    "prostate tenderness",
    "prostatitis",
    "pubic area swollen",
    "pubic hair early onset",
    "pubic hair lice",
    "rash limited to genitals",
    "rash limited to groin",
    "red bump(s) around head of penis",
    "red bump(s) on head of penis",
    "redness of groin",
    "redness of testicle sac",
    "scrotal mass",
    "scrotal mass, firm",
    "scrotal ulceration",
    "scrotum hurts",
    "small penis",
    "swollen scrotum",
    "swollen testicle",
    "testicles hurt to touch",
    "thinning pubic hair",
    "trouble starting to pee",
    "uncircumcised penis",
    "undescended testicles",
    "urethral pain",
    "urinary incontinence",
    "urinary tract infection",
    "urinating less",
    "weak pee stream",
    "wet dream",
  ];
  const hip = [
    "bend at hip",
    "greater tuberosity tenderness",
    "hip deformity",
    "hip feels like it pops out of socket",
    "hip feels stiff",
    "hip hurts",
    "hip is swollen",
    "hip muscle is weak",
    "hip tenderness",
    "hurts to walk",
  ];
  const genital = [
    "a lot of blood in urine",
    "balls turning blue",
    "bladder distention",
    "bladder feels full",
    "bladder infection",
    "blood in urine",
    "bloody pee",
    "bloody sperm",
    "can't have orgasm",
    "can't pee",
    "cloudy pee",
    "decreased sex drive",
    "delayed or late period",
    "discharge from penis",
    "enlarged prostate",
    "epididymal mass",
    "epididymal tenderness",
    "erection that won't go down or soften",
    "feels like need to pee all the time",
    "firm pus filled rash around head of penis",
    "foreskin stuck over head of penis",
    "genital pain",
    "genitals itching",
    "genitals swollen",
    "hard bump(s) around head of penis",
    "hard bump(s) on head of penis",
    "head of penis curves downward",
    "head of penis hurts",
    "head of penis is irritated",
    "head of penis is red and swollen",
    "hurts to ejaculate or cum",
    "immediate urge to pee",
    "impotence",
    "incontinence",
    "inflamed scrotum",
    "irritation between butt and genitals",
    "itching on urethra",
    "large blister(s) on penis",
    "lump in genital area",
    "lump on penis",
    "lump on scrotum",
    "lump on testicle",
    "man ejaculates sooner during sexual intercourse than he or his partner would like",
    "need to pee often",
    "open sore(s) around head of penis",
    "open sore(s) on head of penis",
    "open sore(s) on penis",
    "open sore(s) on urethra",
    "pain in testicle",
    "pain in testicle or ovary",
    "pain in tube behind testicle",
    "pain while peeing",
    "painful erection",
    "painless ulcer on the genitals",
    "passing small kidney stones",
    "pee more than usual",
    "penis hurts",
    "penis is red",
    "penis is red and irritated",
    "prostate pain",
    "prostate tenderness",
    "prostatitis",
    "rash limited to genitals",
    "red bump(s) around head of penis",
    "red bump(s) on head of penis",
    "redness of testicle sac",
    "scrotal mass",
    "scrotal mass, firm",
    "scrotal ulceration",
    "scrotum hurts",
    "small penis",
    "swollen scrotum",
    "swollen testicle",
    "testicles hurt to touch",
    "trouble starting to pee",
    "uncircumcised penis",
    "undescended testicles",
    "urethral pain",
    "urinary incontinence",
    "urinary tract infection",
    "urinating less",
    "weak pee stream",
    "wet dream",
  ];
  const groin = [
    "groin pain",
    "groin tenderness",
    "inguinal hernia",
    "inguinal lymph node abscess",
    "inguinal lymph node enlargement",
    "inguinal lymph node tenderness",
    "lump in groin",
    "painful gland in groin",
    "rash limited to groin",
    "redness of groin",
  ];
  const thigh = [
    "burning feeling on thigh",
    "cramp in thigh muscle",
    "itching thigh",
    "numb thigh muscle",
    "pain in thigh",
  ];
  const knee = [
    "back of knee hurts",
    "darkened skin on knee",
    "dislocated knee",
    "flaky bump(s) limited to elbows or knees",
    "hurts to walk",
    "inflamed fluid sac in knee",
    "knee cracking when moving",
    "knee gets stuck when moving",
    "knee hurts",
    "knee instability",
    "knee joint inflammation",
    "outer side of knee hurts",
    "single flaky raised skin patch on elbows or knees",
    "stiff knee",
    "swollen knee",
    "trouble moving knee",
  ];
  const shin = [
    "ridges on shin bone",
    "sharp forward bowing of shin",
    "tibial bone mass",
    "tibial deformity",
    "tibial pulse absence",
  ];
  const ankle = [
    "ankle pain",
    "ankle redness",
    "ankle swollen",
    "bruise on ankle",
    "lump on ankle",
  ];
  const foot = [
    "ball of foot joint hurts when move",
    "big toe joint is swollen",
    "big toe joint is tender to touch",
    "foot feels weak",
    "foot hurts",
    "foot is numb",
    "foot turning blue",
    "heel hurts",
    "heel is swollen",
    "heel spur",
    "heel tenderness",
    "itchy foot",
    "pain in the arch of foot",
    "rash limited to feet",
    "rash limited to soles of feet",
    "swollen foot",
    "tingling or prickling in foot",
    "trouble moving foot",
  ];
  const toe = [
    "arthritis in big toe",
    "big toe hurts",
    "big toe hurts when moving",
    "big toe is under the second toe",
    "big toe joint is swollen",
    "big toe joint is tender to touch",
    "great toe metatarsophalangeal prominence",
    "nail loss",
    "nail not growing the way it should",
    "nail pulling away from cuticle",
    "rash limited to between toes",
    "stiff knuckles in hands or toes",
    "toe pain",
  ];
  const shoulder = [
    "lump in shoulder",
    "shoulder girdle muscle weakness",
    "shoulder muscle pain",
    "shoulder muscle twitching",
    "shoulder tender to touch",
    "subacromial bursal tenderness",
    "subdeltoid bursal tenderness",
  ];
  const armpit = [
    "axillary lymph node enlargement",
    "axillary lymph node tenderness",
    "darkening skin on armpit",
    "firm lump in arm pit",
    "losing armpit hair",
    "lump in armpit that doesn't move",
    "painful nodules in armpits",
    "rash limited to armpit",
    "very little armpit hair",
  ];
  const bicep = [
    "bicep shaking",
    "biceps and triceps hyperreflexia",
    "biceps hyporeflexia",
    "humeral swelling, lower",
    "triceps hyporeflexia",
    "upper arm pain",
  ];
  const elbow = [
    "darkened skin on elbow",
    "elbow bones out of place",
    "elbow pain",
    "flaky bump(s) limited to elbows or knees",
    "red bump(s) on elbow",
    "single flaky raised skin patch on elbows or knees",
    "stiff elbow",
    "tenderness lateral epicondyle",
  ];
  const forearm = [
    "forearm feels more sensitive",
    "forearm hurts",
    "forearm itches",
    "lump on forearm",
    "tingling or prickling in forearm",
  ];
  const wrist = [
    "crackling sound when moving wrist",
    "wrist hurts when moved",
    "wrist pain",
    "wrist stiffness",
    "wrist swelling",
  ];
  const hand = [
    "asterixis",
    "cold hand",
    "compressed nerve in wrist/hand",
    "cramp in my palm",
    "darkened skin on knuckle(s)",
    "hand cramping at night",
    "hand hurts",
    "hand is numb",
    "hand muscle weakness",
    "hand shaking",
    "hand swelling",
    "knuckle joint on hand hurts",
    "rash limited to hand",
    "rash limited to palm",
    "rash on hand",
    "red flaky rash limited to palms or soles",
    "stiff hands",
    "stiff knuckles in hands or toes",
    "swollen knuckles",
    "tingling or prickling in hand",
    "trouble moving hands",
    "weak hand grip",
  ];
  const fingers = [
    "can't straighten bent finger(s)",
    "finger shaking",
    "finger(s) are swollen",
    "finger(s) hurts",
    "finger(s) locks in place",
    "finger(s) turn red",
    "finger(s) turns blue",
    "nail loss",
    "nail not growing the way it should",
    "nail pulling away from cuticle",
    "thumb hurts",
    "tingling and prickling in finger(s)",
  ];

  const HEAD = forehead;
  const NECK = neck;
  const LEFT_SHOULDER = [
    "shoulder pain",
    "limited range of motion",
    "shoulder stiffness",
    "muscle spasms",
    "numbness in arm",
    "tingling in fingers",
  ];
  const LEFT_UPPER_ARM = [
    "arm pain",
    "weakness in arm",
    "limited range of motion",
    "muscle soreness",
    "numbness in fingers",
    "tingling in arm",
  ];
  const LEFT_ELBOW = [
    "elbow pain",
    "stiffness in elbow",
    "limited range of motion",
    "numbness in fingers",
    "tingling in forearm",
    "difficulty gripping",
  ];
  const LEFT_FOREARM = [
    "forearm pain",
    "muscle cramps",
    "numbness in hand",
    "tingling in fingers",
    "weakness in grip",
    "difficulty turning doorknob",
  ];
  const LEFT_WRIST = [
    "wrist pain",
    "swelling in wrist",
    "limited range of motion",
    "numbness in fingers",
    "tingling in hand",
    "difficulty writing",
  ];
  const LEFT_HAND = [
    "hand pain",
    "swelling in hand",
    "stiffness in fingers",
    "numbness in fingers",
    "tingling in hand",
    "difficulty making a fist",
  ];
  const LEFT_FINGERS = [
    "finger pain",
    "swelling in fingers",
    "stiffness in fingers",
    "numbness in fingers",
    "tingling in fingers",
    "difficulty bending fingers",
  ];
  const RIGHT_SHOULDER = [
    "shoulder pain",
    "limited range of motion",
    "shoulder stiffness",
    "muscle spasms",
    "numbness in arm",
    "tingling in fingers",
  ];
  const RIGHT_UPPER_ARM = [
    "arm pain",
    "weakness in arm",
    "limited range of motion",
    "muscle soreness",
    "numbness in fingers",
    "tingling in arm",
  ];
  const RIGHT_ELBOW = [
    "elbow pain",
    "stiffness in elbow",
    "limited range of motion",
    "numbness in fingers",
    "tingling in forearm",
    "difficulty gripping",
  ];
  const RIGHT_FOREARM = [
    "forearm pain",
    "muscle cramps",
    "numbness in hand",
    "tingling in fingers",
    "weakness in grip",
    "difficulty turning doorknob",
  ];
  const RIGHT_WRIST = [
    "wrist pain",
    "swelling in wrist",
    "limited range of motion",
    "numbness in fingers",
    "tingling in hand",
    "difficulty writing",
  ];
  const RIGHT_HAND = [
    "hand pain",
    "swelling in hand",
    "stiffness in fingers",
    "numbness in fingers",
    "tingling in hand",
    "difficulty making a fist",
  ];
  const RIGHT_FINGERS = [
    "finger pain",
    "swelling in fingers",
    "stiffness in fingers",
    "numbness in fingers",
    "tingling in fingers",
    "difficulty bending fingers",
  ];
  const UPPER_BACK = [
    "upper back pain",
    "muscle tension",
    "stiffness",
    "limited range of motion",
    "headaches",
    "pain radiating to shoulders",
  ];
  const BACK = [
    "back pain",
    "muscle spasms",
    "stiffness",
    "limited range of motion",
    "sciatica",
    "pain radiating down leg",
  ];
  const LOWER_BACK = [
    "lower back pain",
    "muscle spasms",
    "stiffness",
    "limited range of motion",
    "sciatica",
    "difficulty bending over",
  ];
  const LEFT_FLANK = [
    "flank pain",
    "kidney pain",
    "abdominal pain",
    "nausea",
    "vomiting",
    "blood in urine",
  ];
  const RIGHT_FLANK = [
    "flank pain",
    "kidney pain",
    "abdominal pain",
    "nausea",
    "vomiting",
    "blood in urine",
  ];
  const TAIL_BONE = [
    "tailbone pain",
    "pain when sitting",
    "tenderness",
    "bruising",
    "swelling",
    "difficulty with bowel movements",
  ];
  const BUTTOCKS = [
    "buttock pain",
    "muscle soreness",
    "tenderness",
    "numbness in leg",
    "tingling in leg",
    "sciatica",
  ];
  const RECTUM = [
    "rectal pain",
    "bleeding",
    "itching",
    "discharge",
    "constipation",
    "diarrhea",
  ];
  const LEFT_HIP = hip;
  const RIGHT_HIP = hip;
  const RIGHT_HAMSTRING = [
    "hamstring pain",
    "muscle tightness",
    "stiffness",
    "limited range of motion",
    "pain when bending knee",
    "bruising",
  ];
  const RIGHT_POPLITEAL = [
    "knee pain",
    "swelling behind knee",
    "stiffness",
    "limited range of motion",
    "numbness in leg",
    "tingling in leg",
  ];
  const RIGHT_CALF = [
    "calf pain",
    "muscle cramps",
    "swelling",
    "tenderness",
    "numbness in foot",
    "tingling in foot",
  ];
  const RIGHT_ANKLE = [
    "ankle pain",
    "swelling",
    "stiffness",
    "limited range of motion",
    "bruising",
    "difficulty walking",
  ];
  const RIGHT_FOOT = [
    "foot pain",
    "swelling",
    "stiffness",
    "numbness in toes",
    "tingling in toes",
    "difficulty walking",
  ];
  const LEFT_TOES = [
    "toe pain",
    "swelling",
    "stiffness",
    "numbness",
    "tingling",
    "difficulty walking",
  ];
  const LEFT_HAMSTRING = [
    "hamstring pain",
    "muscle tightness",
    "stiffness",
    "limited range of motion",
    "pain when bending knee",
    "bruising",
  ];
  const LEFT_POPLITEAL = [
    "knee pain",
    "swelling behind knee",
    "stiffness",
    "limited range of motion",
    "numbness in leg",
    "tingling in leg",
  ];
  const LEFT_CALF = [
    "calf pain",
    "muscle cramps",
    "swelling",
    "tenderness",
    "numbness in foot",
    "tingling in foot",
  ];
  const LEFT_ANKLE = [
    "ankle pain",
    "swelling",
    "stiffness",
    "limited range of motion",
    "bruising",
    "difficulty walking",
  ];
  const LEFT_FOOT = [
    "foot pain",
    "swelling",
    "stiffness",
    "numbness in toes",
    "tingling in toes",
    "difficulty walking",
  ];

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    }
  };

  const renderContent = () => {
    switch (selectedPart) {
      case "SCALP":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {scalp.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "FOREHEAD":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {forehead.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "EYES":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {eyes.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "NOSE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {nose.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "FACE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {face.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "EARS":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {ears.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "MOUTH":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {mouth.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "JAW":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {jaw.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "NECK":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {neck.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "UPPER CHEST":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {upper_chest.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "BREAST":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {breast.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "STERNUM":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {sternum.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "CHEST":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {chest.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "EPIGASTRIC":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {epigastric.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "UPPER ABDOMEN":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {upper_abdomen.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LOWER ABDOMEN":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {lower_abdomen.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "SUPRAPUBIC":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {suprapubic.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "PELVIC":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {pelvic.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "HIP":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {hip.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "GENITAL":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {genital.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "GROIN":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {groin.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "THIGH":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {thigh.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "KNEE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {knee.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "SHIN":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {shin.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "ANKLE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {ankle.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "FOOT":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {foot.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "TOE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {toe.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "SHOULDER":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {shoulder.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "ARMPIT":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {armpit.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "BICEP":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {bicep.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "ELBOW":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {elbow.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "FOREARM":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {forearm.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case "WRIST":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {wrist.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "HAND":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {hand.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "FINGERS":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {fingers.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case "HEAD":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {HEAD.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "NECK":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {NECK.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT SHOULDER":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_SHOULDER.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT UPPER ARM":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_UPPER_ARM.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT ELBOW":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_ELBOW.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT FOREARM":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_FOREARM.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT WRIST":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_WRIST.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT HAND":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_HAND.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT FINGERS":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_FINGERS.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT SHOULDER":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_SHOULDER.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT UPPER ARM":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_UPPER_ARM.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT ELBOW":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_ELBOW.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT FOREARM":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_FOREARM.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT WRIST":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_WRIST.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT HAND":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_HAND.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT FINGERS":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_FINGERS.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "UPPER BACK":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {UPPER_BACK.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "BACK":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {BACK.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LOWER BACK":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LOWER_BACK.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT FLANK":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_FLANK.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT FLANK":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_FLANK.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "TAIL BONE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {TAIL_BONE.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "BUTTOCKS":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {BUTTOCKS.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RECTUM":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RECTUM.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT HIP":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_HIP.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT HIP":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_HIP.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT HAMSTRING":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_HAMSTRING.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT POPLITEAL":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_POPLITEAL.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT CALF":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_CALF.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT ANKLE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_ANKLE.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "RIGHT FOOT":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {RIGHT_FOOT.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT TOES":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_TOES.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT HAMSTRING":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_HAMSTRING.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT POPLITEAL":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_POPLITEAL.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT CALF":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_CALF.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT ANKLE":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_ANKLE.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case "LEFT FOOT":
        return (
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="p-4 space-y-4">
              {LEFT_FOOT.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center bg-gray-800 p-3 rounded-md shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      className="hidden"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0 flex items-center justify-center transition-colors duration-200 mr-3 ${
                        isChecked
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      case null:
        return <p>Click a body part to see details.</p>;
      default:
        return <p>Selected: {selectedPart}</p>;
    }
  };

  return (
    <>
      {/* Dimming overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-50 z-20"
        />
      )}

      {/* Sliding overlay menu */}
      <div
        className={`fixed top-0 left-0 h-full w-94 bg-background shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full ">
          {/* Fixed header */}
          <div className="p-4 sticky top-0 bg-[#111827] z-30 border-b">
            <h2 className="text-xl font-bold font-white">
              {selectedPart} SYMPTOMS
            </h2>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto scrollbar-thumb-white scrollbar-track-gray-100">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayMenu;
